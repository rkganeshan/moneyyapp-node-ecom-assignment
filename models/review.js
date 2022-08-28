const mongoose=require("mongoose");
const {uuid} =require("uuidv4");
const moment=require("moment");

const reviewSchema=mongoose.Schema({
    _id: { 
        type: String, 
        default: () => uuid() 
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    productId:{
        type:String,
        ref:"Product"
    },
    cDate:{
        type:String,
        default:moment().format("YYYY/MM/DD/HH/mm/ss")
    },
    uDate:String
})

module.exports=mongoose.model("Review",reviewSchema);