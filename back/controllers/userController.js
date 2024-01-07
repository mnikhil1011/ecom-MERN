const userModel =require('../models/userModel');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const productModel=require('../models/productModel')

const maxAge=3 * 24 * 60 * 60;//3 days
createToken=(id)=>{
  return jwt.sign({id},'mnikhil1011',{
    expiresIn: maxAge
  })
}

const signup= async(req,res)=>{

 
  const {emailID,password}=req.body;
  const user=await userModel.findOne({emailID})

  if(!user){
    try{
      const user=await userModel.create({emailID,password})
      console.log(user);
      const token=createToken(user._id)
      res.cookie('userid',token, { httpOnly: true, maxAge: maxAge * 1000 })
      res.status(200).json(user);
    }
    catch(err){
      return res.status(400).json({error:err});
    }
    
  }
  else{
    res.status(400).json({error:"already exists"});
  }

}

const login= async(req,res)=>{
  const {emailID,password}=req.body;
  try{
    user=await userModel.login(emailID,password)
  }
  catch(e){
    return res.status(400).json({error:e.message});
  }

  const token=createToken(user._id)
  res.cookie('userid',token, { httpOnly: true, maxAge: maxAge * 1000 })
  res.status(200).json(user);
}

//we set lifetime to 1 ms so it goes
const logout= async(req,res)=>{
  console.log("okkk")
  res.cookie('userid','',{maxAge:1});
  return res.status(200).json('')
}

const addtocart= async(req,res)=>{
  const user=await userModel.findOne({_id:req.userid});
  if(!user){
    return res.status(400).json({error:"no such user"});
  }

  const {name,quantity}=req.body;
  const prod=await productModel.findOne({name})
  if(!prod){
    return res.status(400).json({error:"no such product"});
  }
  if(prod.quantity<quantity){
    return res.status(400).json({error:`max available quantity is ${prod.quantity}`});
  }
  const newquant=prod.quantity-quantity
  

  const tryupdate=await userModel.findOneAndUpdate(
    {_id:req.userid,'cart.name':name},
    { $inc:{'cart.$.quantity':quantity}},
    
  )
  if(tryupdate)
  {

    console.log("here");
    return res.status(200).json({tryupdate})
  } 

  await productModel.findOneAndUpdate({name},{$set:{quantity:newquant}});

  const newcart={name,quantity};
  const updatedUser=await userModel.findOneAndUpdate({_id:req.userid},{$push:{cart:newcart}})
  return res.status(200).json({updatedUser});

}

const cart=async(req,res)=>{
  const user= await userModel.findOne({_id:req.userid})
  console.log(user);
  return res.status(200).json({user})
}

const deleteFromCart=async(req,res)=>{
  console.log(req.body);
  const {name,quantity} = req.body;
  await productModel.findOneAndUpdate({name},{$inc:{'quantity':quantity}});
  
  console.log(name);
  console.log(req.userid);
  const retval= await userModel.findOneAndUpdate(
    {_id:req.userid},
    {$pull:{'cart':{name}}}
  )

  return res.status(200).json({retval});
  

}

const checkout=async (req,res)=>{
  const id=req.userid;
  const response=await userModel.updateOne(
    {_id:id},
    {$set:{cart:[]}}
  )

  return res.status(200).json({response});


}

module.exports={
  signup,
  login,
  logout,
  addtocart,
  cart,
  deleteFromCart,
  checkout
}