const Product=require("../models/product");
const Review=require("../models/review");
const moment=require("moment");


exports.getAllReviewsByProductId=async(req,res)=>{
    try
    {
        const product=await Product.findById(req.params.productId);
        if(product)
        {
            await Review.find({productId:req.params.productId})
            .populate("productId","_id name price")
            .then((resp)=>{
                res.status(200).json({
                    reviews:resp
                })
            })
            .catch((err)=>{
                if(err)
                res.status(500).json({message:err});
            })
        }
        else
        {
            throw("The provided product id doesnt exist, so no reviews for that product to show.")
        }
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}

exports.createReview=async(req,res)=>{
    try{
        let product=await Product.findById(req.params.productId);
        if(product)
        {
            if(req.body.description)
            {
                let newReview=await Review.create(req.body);
                newReview.productId=product;
                await newReview.save();
                res.status(200).send({message:"Review Created",newReview});
            }
            else
            {
                throw("'description' field is not present in request body.")
            }
        }
        else
        {
            throw("Provided Product id not found,so review cannot be created for that product.")
        }
        
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}


exports.deleteReview=async(req,res)=>{
    try{
        const review=await Review.findById(req.params.reviewId);
        if(review)
        {
            await review.deleteOne({_id:req.params.reviewId});
            res.status(204).send({message:"Review Deleted Deleted"});
        }
        else
        {
            throw("Provided Review id doesnt exist.")
        }        
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}