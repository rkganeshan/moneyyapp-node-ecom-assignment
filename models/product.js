const mongoose=require("mongoose");
const {uuid} =require("uuidv4");
const moment=require("moment");

const productSchema=mongoose.Schema({
    _id: { 
        type: String, 
        default: () => uuid() 
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        require:true,
        trim:true
    },
    cDate:{
        type:String,
        default:moment().format("YYYY/MM/DD/HH/mm/ss")
    },
    uDate:String
})

module.exports=mongoose.model("Product",productSchema);