const mongoose = require("mongoose");
const { Schema } = mongoose;

const creditListSchema = new Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer"
    },
    name: { 
        type: String, 
        required:true 
    },
    description: { 
        type: String,
    },
    quantity: { 
        type: String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

const creditList = mongoose.model("creditList",creditListSchema);
module.exports = creditList;