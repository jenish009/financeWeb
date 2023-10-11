const express = require("express");
require("dotenv").config();
require('./config/dbConnection');
const cors = require("cors"); // Import the cors middleware

const app = express();
app.use(express.json());

// Use the cors middleware to allow all origins
app.use(cors());

const { userRoutes, taskRoutes, postRoutes, newsRoutes } = require("./routers");
app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use("/post", postRoutes);
app.use("/news", newsRoutes);




const port = process.env.PORT || 3000; // Use a default port if PORT is not defined in .env

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
