const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        imageUrl:{
            type:String,
        },
        tags:{
            type:String,
        },
        email:{
            type:String,
        }
    })


    // Post Middleware
    fileSchema.post("save", async function(doc){
        try {
            console.log("DOC", doc);

            //Transporter
            let transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                auth:{
                    user:process.env.MAIL_USER,
                    pass:process.env.MAIL_PASS
                },
            })

            //Send mail
            let info = await transporter.sendMail({
                from:`Saurabh yadav`,
                to:doc.email,
                subject:"New file uploaded on cloudinary",
                html:`<h2>Hello jee</h2> <p>File Uploaded  View here : <a href = "${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
            })

            console.log("INFO", info);
        } catch (error) {
            console.error(error);
        }
    })

    // module.exports = mongoose.model("File", fileSchema);
    const File = mongoose.model("File", fileSchema);
    module.exports = File;