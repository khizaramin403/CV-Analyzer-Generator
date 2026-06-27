// const mongoose = require("mongoose");

// const connectToDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//         console.log("connected to MongoDB");
//     } catch (err) {
//         console.log(err)
//     }
// };

// module.exports = connectToDB;


const mongoose = require("mongoose");

// Agar process.env load na ho raha ho toh direct backup string chal jaye
const dbURI = process.env.MONGODB_URI || "mongodb+srv://khizarkhan8585_db_user:jNFrGoluDMJPKJDD@interview-ai-cluster.jvk1q66.mongodb.net/interview-master";

const connectToDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectToDB;