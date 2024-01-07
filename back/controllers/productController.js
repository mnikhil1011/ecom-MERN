const productModel=require('../models/productModel')

const createProduct=async (req,res)=>{
  const {name,category,quantity}=req.body;
  const mID=req.mID
  console.log("here");
  console.log({name,category,quantity,mID})

  const prod=await productModel.findOne({name:name});
  if(prod)
  {
    return res.status(400).json({error:"this product already exists"});
  }
  
  const product=await productModel.create({name,category,quantity,mID})
  return res.status(200).json(product);
}

const updateQuantity=async(req,res)=>{
  const {name,quantity}=req.body
  const prod=await productModel.findOneAndUpdate({name},{$set:{quantity}});
  if(prod)
  {
    return  res.status(200).json(prod);
  }
  return res.status(400).json({error:"this product doesnt exists"});
}
const deleteProduct=async(req,res)=>{
  const {name}=req.body
  const prod=await productModel.findOneAndDelete({name});
  if(prod)
  {
    return  res.status(200).json(product);
  }
  return res.status(400).json({error:"this product doesnt exist"});
}

const allManager= async(req,res)=>{
  const prods=await productModel.find({mID:req.mID})
  return res.status(200).json(prods);
}

const allProducts= async(req,res)=>{
  const prods=await productModel.find()
  return res.status(200).json(prods); 
}

const getdetails=async(req,res)=>{
  console.log("hi");
  const name=req.params.name;
  const prod=await productModel.findOne({name});
  console.log(name, prod)
  return res.status(200).json(prod);
}

const productbyCategory= async(req,res)=>{
  const category=req.params.category;
  const prods=await productModel.find({category})
  return res.status(200).json(prods); 
}

module.exports={
  createProduct,
  updateQuantity,
  deleteProduct,
  allManager,
  allProducts,
  getdetails,
  productbyCategory
}