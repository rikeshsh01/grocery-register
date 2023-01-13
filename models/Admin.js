const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
    name: { 
        type: String, 
        required:true 
    },
    email: { 
        type: String, 
        unique:true,
        required:true 
    },
    phone:{
        type: String, 
        unique:true,
        required:true 
    },
    password: { 
        type: String, 
        required:true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }

});

const Admin = mongoose.model("admin",adminSchema);
// User.createIndexes();
module.exports = Admin;