const userConnection = require('mongoose');
userConnection.connect(process.env.MONGO_URI || "mongodb://localhost:27017");

const db = userConnection.connection;
db.on('error', console.error.bind(console, "Cannot connect to database"));
db.on('open', function () {
    console.log("User connection successful");
});

module.exports = db;