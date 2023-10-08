const mongoose = require('mongoose');

// Define the BlogPost schema
const blogPostSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
        },
        title: {
            type: String,
        },
        category: {
            type: String,
        },
        subCategory: {
            type: [String],
        },
        description: {
            type: String,
        },
        content: {
            type: Array,
        },
        authorName: {
            type: String,
        },
        authorAvatar: {
            type: String,
        },
        createdAt: {
            type: String,
        },
        cover: {
            type: String,
        },
    },
    { versionKey: false }
);

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
