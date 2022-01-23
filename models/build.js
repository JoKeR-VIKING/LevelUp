const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    avatar: {
        type: String
    }
});

const builds = mongoose.model('Builds', schema);
module.exports = builds;