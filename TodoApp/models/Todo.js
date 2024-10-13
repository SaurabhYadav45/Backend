const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        description:{
            type: String,
            required: true,
            maxLength: 50
        },
        title:{
            type: String,
            required:true,
            maxlength: 50,
        },
        
        createdAt:{
            type: Date,
            required:true,
            default: Date.now(),
        },
        updatedAt:{
            type: Date,
            required: true,
            default: Date.now(),
        },
    },
);

module.exports = mongoose.model("Todo", todoSchema);