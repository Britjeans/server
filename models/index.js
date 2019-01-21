const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/react-blog", {
    keepAlive: true
});

module.exports.User = require("./user");
module.exports.Blog = require("./blog");



