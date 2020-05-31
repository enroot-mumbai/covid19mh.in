const mongoose = require('mongoose');
const schema = mongoose.Schema;;

const DistrictModel = new schema({
    name: String,
});

module.exports = mongoose.model('District',DistrictModel);