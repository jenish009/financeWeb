const { subscribeModel } = require("../models");

const subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        let exist = await subscribeModel.findOne({ email })
        if (!exist) {
            const newSubscribe = new subscribeModel({
                email
            });
            const savedPost = await newSubscribe.save();
        }

        res.status(201).json({ success: true, message: "Subscribed!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { subscribe }