// require("dotenv").config();
// const app = require("./src/app");
// const connectToDB = require("./src/config/database");

// connectToDB();

// app.get("/",(req,res)=>{
//     res.send("Hello World! khizar");
// })


// app.listen(3000, () => {
//     console.log("Server started on port 3000");
// });

// module.exports = app;


require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");

// Database connect karein
connectToDB();

// Default testing route
app.get("/", (req, res) => {
    res.send("Hello World! khizar");
});

// Sirf local check ke liye listen chalayein, production (Vercel) par ye bypass ho jaye
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}

// Vercel serverless functions ke liye export sab se zaroori hai
module.exports = app;