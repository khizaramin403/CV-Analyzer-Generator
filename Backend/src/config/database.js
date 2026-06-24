const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to MongoDB");
    } catch (err) {
        console.log(err)
    }
};

module.exports = connectToDB;