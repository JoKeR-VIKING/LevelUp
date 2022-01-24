const buildConnection = require('mongoose');
buildConnection.connect("mongodb+srv://prathamvasani1:MM0g75MvxuNIr2T1@cluster0.ckr5c.mongodb.net/levelup?retryWrites=true&w=majority");

const db = buildConnection.connection;
db.on('error', console.error.bind(console, "Cannot connect to database"));
db.on('open', function () {
    console.log("Build connection successful");
});

module.exports = db;