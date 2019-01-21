const mongoose = require("mongoose");
const User = require("./user");

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

blogSchema.pre('remove', async function(next) {
    
    try {
        //find a user
        let user = await User.findById(this.user);
        user.blogs.remove(this.id);
        await user.save();
        return next();
    } catch (err) {
        return next(err);
    }
})


Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;