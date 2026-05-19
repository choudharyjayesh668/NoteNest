const mongoose = require("mongoose");

const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default: Date.now
    },

});

const Note=mongoose.model("note", noteSchema);
module.exports = Note;