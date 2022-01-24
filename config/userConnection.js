const userConnection = require('mongoose');
userConnection.connect("mongodb+srv://prathamvasani1:MM0g75MvxuNIr2T1@cluster0.ckr5c.mongodb.net/levelup?retryWrites=true&w=majority");

const db = userConnection.connection;
db.on('error', console.error.bind(console, "Cannot connect to database"));
db.on('open', function () {
    console.log("User connection successful");
});

module.exports = db;