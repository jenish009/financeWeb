const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Define the User schema
const taskSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            required: true,
        },
        isDone: {
            type: Boolean,
            default: false,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false },
);

const taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;