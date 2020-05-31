const mongoose = require('mongoose');
const schema = mongoose.Schema;;

const BlogModel = new schema({
    name: String,
    tag: String,
    problem: String,
    districtID: String
});

module.exports = mongoose.model('Blog',BlogModel);