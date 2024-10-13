const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Middleware to parse request body
app.use(express.json());

// Mount on the Routes
const user = require("./routes/User");
app.use("/api/v1", user);

app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
})

const connectWithDb = require("./config/database");
connectWithDb();
