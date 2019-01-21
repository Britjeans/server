require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const {getBlog, getBlogs} = require("./handlers/blog")
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const db = require("./models");
const {loginRequired, ensureCorrectUser} = require("./middleware/auth");

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

//all my routes are here
app.use("/api/auth", authRoutes);
app.get("/api/blogs", async function(req, res, next) {
    try {
        let blogs = await db.Blog.find().sort({createdAt: "desc"}).populate("user", {username: true, profileImageUrl: true});
        return res.status(200).json(blogs);
    }
    catch(err) {
        return next(err);
    }
});

app.get("/api/blogs/:blog_id", getBlog);

app.get("/api/users/:id/blogs", getBlogs);

app.use("/api/users/:id/blogs", loginRequired, ensureCorrectUser, blogRoutes);

app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler); 

app.listen(PORT, function() {
    console.log('Server is starting on port ' + PORT);
});

