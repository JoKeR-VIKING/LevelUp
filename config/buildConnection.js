const buildConnection = require('mongoose');
buildConnection.connect("mongodb://localhost/levelup");

const db = buildConnection.connection;
db.on('error', console.error.bind(console, "Cannot connect to database"));
db.on('open', function () {
    console.log("Build connection successful");
});

module.exports = db;