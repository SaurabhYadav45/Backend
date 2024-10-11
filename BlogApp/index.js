const express = require("express")
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

const blog = require("./routes/blog")
// Mount
app.use("/api/v1", blog);

const connectWithDb = require("./config/database");
connectWithDb();

app.listen(PORT, () => {
    console.log(`App is running at port : ${PORT}`);
})

app.get("/", (req, res) => {
    res.send(`<h1> This is Homepage Baby </h1>`)
})