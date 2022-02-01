const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Array,
    }
});

const Prices = mongoose.model('Prices', schema);
module.exports = Prices;