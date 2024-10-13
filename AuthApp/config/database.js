const mongoose  = require("mongoose");

require("dotenv").config();

const connectWithDb = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        // Optional Arguement
        // useNewUrlParser: true,
        // useUnifiedTopology:true
    })
    .then(()=> {console.log("DB connected successfully")})
    .catch((err) =>{
        console.log("DB Connection Issue");
        console.error(err);
        process.exit(1);
    });
}

module.exports = connectWithDb;