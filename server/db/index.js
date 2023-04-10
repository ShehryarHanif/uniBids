const mongoose = require('mongoose');

// Connect to MongoDB according to the indicated environment to run the app in

mongoose.connect("mongodb://127.0.0.1:27017/biddingApp")
    .then(() => console.log("Successfully connected to DB!"))
        .catch(err => console.log(err));