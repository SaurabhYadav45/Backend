const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewurlParser: true,
        useUnifiedTopology:true
    })
    .then(() => console.log("DB ka Connection is Successful"))
    .catch((error) => {
        console.log("ISSUE IN DB CONNECTION");
        console.error((error.message));
        process.exit(1);
    });
}

module.exports = dbConnect;