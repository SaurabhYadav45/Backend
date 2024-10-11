const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDb = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("DB connected sucessfully"))
    .catch( (error) => {
        console.log("DB facing Connection Issue");
        console.log(error);
        process.exit(1);
    })
};

module.exports = connectWithDb;
