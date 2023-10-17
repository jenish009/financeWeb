const { userModel, otpModel, taskModel, postModel } = require("../models");

const createPost = async (req, res) => {
    try {
        const { title, category, subCategory, description, content, authorName, authorAvatar, createdAt, cover } = req.body;

        // Create a new instance of the post using the postModel
        const newPost = new postModel({
            title, category, subCategory, description, content, authorName, authorAvatar, createdAt, cover
        });

        // Save the post to the database
        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// Get all posts
const getPosts = async (req, res) => {
    try {
        const { searchFilter, page = 1, limit = 10 } = req.query; // Get the 'filter', 'page', and 'limit' query parameters

        let filterObject = {};

        if (searchFilter) {
            filterObject = {
                $or: [
                    { title: { $regex: new RegExp(searchFilter, 'i') } },
                    { category: { $regex: new RegExp(searchFilter, 'i') } },
                    { subCategory: { $regex: new RegExp(searchFilter, 'i') } },
                    { description: { $regex: new RegExp(searchFilter, 'i') } },
                    { content: { $regex: new RegExp(searchFilter, 'i') } },
                    { authorName: { $regex: new RegExp(searchFilter, 'i') } },
                ]
            };
        }

        // Check if 'page' and 'limit' are not provided and return all data if not
        if (!req.query.page && !req.query.limit) {
            const posts = await postModel
                .find(filterObject)
                .sort({ _id: -1 })
                .exec();
            res.status(200).json({ data: posts });
        } else {
            // Count the total number of documents that match the filter criteria
            const totalDocs = await postModel.countDocuments(filterObject);

            // Calculate the skip value to paginate the results
            const skip = (page - 1) * limit;

            // Find posts that match the filter criteria with pagination
            const posts = await postModel
                .find(filterObject)
                .sort({ _id: -1 })
                .skip(skip)
                .limit(parseInt(limit));

            res.status(200).json({ data: posts, totalPages: Math.ceil(totalDocs / limit) });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




const getPostById = async (req, res) => {
    try {
        const { id } = req.query;

        // Validate the 'id' parameter
        if (!id) {
            return res.status(400).json({ message: 'ID parameter is required' });
        }

        // Use Mongoose to find the post by its ID
        const post = await postModel.findById(id);

        // Check if a post with the specified ID exists
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById
};