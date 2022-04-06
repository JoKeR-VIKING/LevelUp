const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    motherboard: {
        type: String,
        required: true
    },
    cpuList: {
        type: Array,
    },
    gpuList: {
        type: Array,
    },
    ramList: {
        type: Array,
    },
    storageList: {
        type: Array,
    },
    power_supplyList: {
        type: Array,
    }
});

const Compatible = mongoose.model('Compatible', schema);
module.exports = Compatible;