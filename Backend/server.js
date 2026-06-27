require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();

app.get("/",(req,res)=>{
    res.send("Hello World! khizar");
})


app.listen(3000, () => {
    console.log("Server started on port 3000");
});

module.exports = app;