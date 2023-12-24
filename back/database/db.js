const mongoose = require('mongoose');

const connectToServer = (callback) => {
    const uri = "mongodb+srv://admin:admin@cluster0.lmjx486.mongodb.net/Auth";

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Successfully connected to MongoDB.");
            callback();
        })
        .catch(err => {
            console.error("MongoDB connection error: ", err);
            callback(err);
        });
};

module.exports = { connectToServer };
