const mongoose = require("mongoose")
require('dotenv').config()

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        dbName: "devlance",
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log("DB connected")).catch((error) => {
        console.log(error);
        process.exit(1);
    })
}