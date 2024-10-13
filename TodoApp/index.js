const express = require("express")
const app = express();

// Load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Middleware to parse json request body
app.use(express.json());

// Import routes for Todo API 
const todoRoutes = require("./routes/todos");

// mount the Todo API Routes
app.use("/api/v1", todoRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server started successfully at port : ${PORT}`)
})

// connect on database
const dbConnect = require("./config/database");
dbConnect();

// Default route
app.get("/", (req, res) => {
    res.send(`<h1>This is Homepage Baby</h1>`)
})