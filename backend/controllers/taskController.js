const { userModel, otpModel, taskModel } = require("../models");

const getUserTask = async (req, res) => {
    const { _id } = req.body;

    try {
        let
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const createUserTask = async (req, res) => {

    try {
        const { userId } = req.body;

        const twentyTwoHoursAgo = new Date();
        twentyTwoHoursAgo.setHours(twentyTwoHoursAgo.getHours() - 22);

        let pendingTask = await taskModel.findOne({ isDone: false });

        if (pendingTask)
            throw new Error(`Please Complete first pending task`)

        let completedIn24HrTask = await taskModel.find({
            userId: userId, // Replace with the user's ID
            isDone: true,
            createdAt: { $gte: twentyTwoHoursAgo },
        }).sort({ createdAt: -1 });
        let createTask
        console.log(completedIn24HrTask)
        if (completedIn24HrTask.length == 0) {
            createTask = await taskModel.create({
                userId: userId,
            })
        } else
            if (completedIn24HrTask.length >= 5) {
                const createdAtOfFirstTask = completedIn24HrTask[0].createdAt;
                const twentyFourHoursLater = new Date(createdAtOfFirstTask);
                twentyFourHoursLater.setHours(twentyFourHoursLater.getHours() + 24);

                // Calculate the remaining time in milliseconds
                const currentTime = new Date();
                const remainingTimeInMilliseconds = twentyFourHoursLater - currentTime;

                // Convert the remaining time to hours or other desired format
                const remainingTimeInHours = remainingTimeInMilliseconds / (1000 * 60 * 60);
                throw new Error(`Your daily limit is over remaining time : ${remainingTimeInHours}`)
            } else
                if (completedIn24HrTask.length < 5) {
                    const createdAtOfFirstTask = completedIn24HrTask[0].createdAt;
                    const twentyFourHoursLater = new Date(createdAtOfFirstTask);

                    // Calculate the remaining time in milliseconds
                    const currentTime = new Date();
                    const remainingTimeInMilliseconds = twentyFourHoursLater - currentTime;
                    const remainingTimeInMinutes = remainingTimeInMilliseconds / 60000;
                    console.log("remainingTimeInMinutes", remainingTimeInMinutes)
                    if (remainingTimeInMinutes > -15) {
                        throw new Error(`Task Open after ${Math.round(15 - Math.abs(remainingTimeInMinutes))} minutes`);
                    }
                    createTask = await taskModel.create({
                        userId: userId,
                    })
                }

        res.status(200).json({ token: createTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUserTask,
    createUserTask
};
