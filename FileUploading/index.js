const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

//Middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// Db Connection
const db = require("./config/database");
db.connect();

//cloud connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// API route mount
const Upload = require("./routes/FileUpload")
app.use("/api/v1/upload", Upload);

//Activate server
app.listen(PORT, ()=> {
    console.log(`App is runnning at port at ${PORT}`);
})