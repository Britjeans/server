const express = require("express");
const router = express.Router({mergeParams: true});


const { createBlog, deleteBlog, updateBlog } = require("../handlers/blog");

// prefix - /api/user/:/blogs
router.route("/").post(createBlog);

//GET    /api/users/:id/blogs/:blog_id
//DELETE /api/users/:id/blogs/:blog_id
router.route("/:blog_id").delete(deleteBlog);

router.route("/:blog_id").put(updateBlog);


module.exports = router;