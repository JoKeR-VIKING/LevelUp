const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    wishlistedUsers: {
        type: Array,
        required: true
    }
});

const wishlist = mongoose.model('Wishlist', schema);
module.exports = wishlist;