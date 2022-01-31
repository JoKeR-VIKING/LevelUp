const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    motherboard: {
        type: String,
        required: true
    },
    cpuList: {
        type: Array,
    }
});

const Compatible = mongoose.model('Compatible', schema);
module.exports = Compatible;