const axios = require('axios');
const fs = require('fs');
const filePath = 'public/sitemap.txt';

const apiUrlNews = 'http://localhost:5000/news/getAllNews';
const apiUrlBlog = 'http://localhost:5000/post/getPosts';

const sitemap = [
    'https://www.financialhub.info/',
    'https://www.financialhub.info/about',
    'https://www.financialhub.info/contactUs',
    'https://www.financialhub.info/privacyPolicy'
];

async function fetchData(apiUrl) {
    try {
        const response = await axios.get(apiUrl);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function writeSitemapToFile(sitemap, filePath) {
    const fileStream = fs.createWriteStream(filePath);
    sitemap.forEach(url => {
        fileStream.write(url + '\n');
    });
    fileStream.end();
    fileStream.on('finish', () => {
        console.log('Sitemap data has been written to sitemap.txt');
    });
    fileStream.on('error', (err) => {
        console.error('Error writing sitemap data:', err);
    });
}

async function createNewSiteMap() {
    try {
        const [newsData, blogData] = await Promise.all([
            fetchData(apiUrlNews),
            fetchData(apiUrlBlog)
        ]);

        const newsLinks = newsData.map(obj => `https://www.financialhub.info/news/${obj.title.toLowerCase().replace(/\s+/g, "-")}/${obj._id}`);
        const blogLinks = blogData.map(obj => `https://www.financialhub.info/blog/${obj.title.toLowerCase().replace(/\s+/g, "-")}/${obj._id}`);

        sitemap.push(...newsLinks, ...blogLinks);

        writeSitemapToFile(sitemap, filePath);
    } catch (error) {
        console.log("error>>", error);
    }
}

createNewSiteMap();
