const express=require("express");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/product");
const router=express.Router();


router.get("/",getAllProducts);
router.get("/:productId",getProductById);
router.post("/new",createProduct);
router.put("/:productId",updateProduct);
router.delete("/:productId",deleteProduct);

module.exports=router;