const mongoose = require('mongoose');

// Define the News schema
const subscribeSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            uniqe: true
        },
    },
    { versionKey: false }
);

const subscribeModel = mongoose.model('subscribe', subscribeSchema);

module.exports = subscribeModel;
