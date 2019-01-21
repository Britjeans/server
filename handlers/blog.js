const db = require("../models");


//post /api/users/:id/blogs
exports.createBlog = async function(req, res, next) {
    try {
        let blog = await db.Blog.create({
            user: req.params.id,
            title: req.body.title,
            content: req.body.content 
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.blogs.push(blog.id);
        await foundUser.save();
        let foundBlog = await db.Blog.findById(blog._id).populate("user", {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(foundBlog);
    }
    catch(err) {
        return next(err);
    } 

};

//GET /api/blogs/:blog_id
exports.getBlog = async function(req, res, next) {
    try {
        let blog = await db.Blog.findById(req.params.blog_id).populate("user", {username: true, profileImageUrl: true});
        return res.status(200).json(blog);
    }
    catch(err) {
        return next(err);
    }
}

//GET /api/users/:id/blogs/
exports.getBlogs = async function(req, res, next) {
    try {
        console.log(req.params.id);
        let user = await db.User.findById(req.params.id).populate({
            path: "blogs",
            options: { sort: { createdAt: -1 } }, 
            populate: {
                path: "user"
            }
        });
        let blogs = user.blogs;
        return res.status(200).json(blogs);
    }
    catch(err) {
        return next(err);
    }
}


//DELETE /api/users/:id/blogs/:blog_id
exports.deleteBlog = async function(req, res, next) {
    try {
        let blog = await db.Blog.findById(req.params.blog_id);
        await blog.remove();
        return res.status(200).json(blog);
    }
    catch(err) {
        return next(err);
    }
}



exports.updateBlog = async function(req, res, next) {
    try {
        await db.Blog.findOneAndUpdate({_id: req.params.blog_id}, req.body, function(err, blog) {
            if(err) {
                console.log(err);
            } else {
                res.send(blog);
            }
        });
        
    }
    catch(err) {
        return next;
    }
}