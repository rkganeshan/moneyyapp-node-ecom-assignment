const Product=require("../models/product");
const moment=require("moment");

exports.getAllProducts=async(req,res)=>{
    try{
        const products=await Product.find({});
        if(products)
        {
            res.status(200).send({products});
        }
        else
        {
            throw("No products available");
        }
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}

exports.getProductById=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.productId);
        if(product)
        {
            res.status(200).send({product})
        }
        else
        {
            throw("Provided Product id doesnt exist.")
        }
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}

exports.createProduct=async(req,res)=>{
    try{
        if(req.body.name && req.body.price)
        {
            let newProduct=await Product.create(req.body);
            res.status(201).send({message:"New Product Created",newProduct});
        }
        else
        {
            throw(" 'name' and/or 'price' field(s) not present in request body");
        }
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}

exports.updateProduct=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.productId);
        if(product)
        {
            for(let key in req.body)
            {
                product[key]=req.body[key];
            }
            product.uDate=moment().format("YYYY/MM/DD/HH/mm/ss");
            await product.save();
            res.status(200).send({message:"Product Updated",updatedProduct:product});
        }
        else
        {
            throw(`Product with id:${req.params.productId} doesnt exist.`)
        }
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}

exports.deleteProduct=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.productId);
        if(product)
        {
            await product.deleteOne({_id:req.params.productId});
            res.status(204).send({message:"Product Deleted"});
        }
        else
        {
            throw("The provided product id doesnt exist, so nothing to delete.")
        }
    }
    catch(err)
    {
        res.status(500).send({err});
    }
}