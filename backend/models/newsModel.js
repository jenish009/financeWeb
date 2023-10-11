const mongoose = require('mongoose');

// Define the News schema
const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        content: {
            type: Array,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        topics: {
            type: Array,
            required: true,
        },
        createdAt: {
            type: String,
        },
    },
    { versionKey: false }
);

const newsModel = mongoose.model('news', newsSchema);

module.exports = newsModel;
