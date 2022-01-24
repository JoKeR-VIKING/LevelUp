const buildConnection = require('mongoose');
buildConnection.connect(process.env.MONGO_URI || "mongodb://localhost:27017");

const db = buildConnection.connection;
db.on('error', console.error.bind(console, "Cannot connect to database"));
db.on('open', function () {
    console.log("Build connection successful");
});

module.exports = db;