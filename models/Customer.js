const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
    name: { 
        type: String, 
        required:true 
    },
    email: { 
        type: String, 
        unique:true
    },
    phone: { 
        type: String, 
        unique:true,
        required:true 
    },
    address:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    date: { 
        type: Date, 
        default: Date.now 
    }

});

const Customer = mongoose.model("customer",customerSchema);
module.exports = Customer;