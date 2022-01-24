const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    motherboard: {
        type: Array,
        required: true
    },
    cpu: {
        type: Array,
        required: true
    },
    gpu: {
        type: Array,
        required: true
    },
    ram: {
        type: Array,
        required: true
    },
    storage: {
        type: Array,
        required: true
    },
    psu: {
        type: Array,
        required: true
    },
    price: {
        type: Number
    },
    avatar: {
        type: String
    }
});

const builds = mongoose.model('Builds', schema);
module.exports = builds;