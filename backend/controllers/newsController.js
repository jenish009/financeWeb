const express = require('express');
const { newsModel } = require('../models');
const { google } = require('googleapis');
const path = require('path');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const keyFile = path.join(__dirname + '/credential.json'); // Replace with the path to your downloaded JSON key file
const { Readable } = require('stream'); // Import the stream module
const sharp = require('sharp');
const RSS = require('rss');

const auth = new google.auth.GoogleAuth({
    keyFile,
    scopes: ['https://www.googleapis.com/auth/drive'], // Adjust the scope as needed
});

// Create a Drive API client
const drive = google.drive({ version: 'v3', auth });

const getAllNews = async (req, res) => {
    try {
        const searchFilter = req.query.searchFilter || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; // Set a default limit if not provided
        const skip = (page - 1) * limit; // Calculate the number of documents to skip

        const query = {
            $or: [
                { title: { $regex: searchFilter, $options: 'i' } },
                { content: { $regex: searchFilter, $options: 'i' } },
                { author: { $regex: searchFilter, $options: 'i' } },
            ],
        };

        // Check if page and limit are not provided, and if so, don't use pagination
        if (!req.query.page && !req.query.limit) {
            const news = await newsModel.find(query).sort({ _id: -1 }).exec();
            res.status(200).json({ data: news });
        } else {
            const news = await newsModel.find(query)
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit)
                .exec();
            const totalDocs = await newsModel.countDocuments(query);
            const totalPages = Math.ceil(totalDocs / limit);
            res.status(200).json({ data: news, totalPages });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getAllNewsFeed = async (req, res) => {
    try {
        const searchFilter = req.query.searchFilter || '';


        const query = {
            $or: [
                { title: { $regex: searchFilter, $options: 'i' } },
                { content: { $regex: searchFilter, $options: 'i' } },
                { author: { $regex: searchFilter, $options: 'i' } },
            ],
        };

        // Check if page and limit are not provided, and if so, don't use pagination

        const news = await newsModel.find(query).sort({ _id: -1 }).exec();
        // Create the RSS feed manually
        const feedItems = news.map((entry) => {
            return `
                <item>
                    <title><![CDATA[${entry.title}]]></title>
                    <description><![CDATA[${entry.description}]]></description>
                    <link>https://yourwebsite.com/news/${entry._id}</link>
                    <guid isPermaLink="false">${entry._id}</guid>
                    <pubDate>${entry.createdAt}</pubDate>
                </item>
            `;
        });

        const rssFeed = `
            <?xml version="1.0" encoding="UTF-8" ?>
            <rss version="2.0">
                <channel>
                    <title>Your News Feed</title>
                    <description>Latest news articles</description>
                    <link>https://yourwebsite.com</link>
                    ${feedItems.join('')}
                </channel>
            </rss>
        `;

        res.set('Content-Type', 'application/rss+xml');
        res.send(rssFeed);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createNews = async (req, res) => {
    try {
        upload.single('cover')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: 'File upload failed' });
            }
            try {
                const imageBuffer = req.file.buffer;

                // Use sharp to resize and compress the image
                const compressedImageBuffer = await sharp(imageBuffer)
                    .resize({ width: 800, height: 600 }) // Set the desired width and height
                    .jpeg({ quality: 80 }) // Set the JPEG quality (adjust as needed)
                    .toBuffer();

                const imageStream = Readable.from(compressedImageBuffer);

                const { title, content, description, topics, createdAt } = JSON.parse(req.body.data);

                const fileExtension = req.file.originalname.split('.').pop();
                const filename = `image_${Date.now()}.${fileExtension}`;

                const driveResponse = await drive.files.create({
                    resource: {
                        name: filename,
                        mimeType: req.file.mimetype,
                        parents: ['1zHrMQg0efUnNL2wohvvWmrqjJIx4iONU'],
                    },
                    media: {
                        mimeType: req.file.mimetype,
                        body: imageStream,
                    },
                });

                const imageLink = `https://drive.google.com/uc?id=${driveResponse.data.id}`;

                const newNews = new newsModel({
                    title,
                    content,
                    description,
                    topics,
                    cover: imageLink,
                    createdAt,
                });

                await newNews.save();
                res.status(201).send({ message: 'upload' });
            } catch (error) {
                console.error(error);
                res.status(500).send({ error: 'Error uploading to Google Drive' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const getNewsById = async (req, res) => {
    try {
        const news = await newsModel.findById(req.query.id).exec();
        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }
        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllNews, createNews, getNewsById, getAllNewsFeed };
