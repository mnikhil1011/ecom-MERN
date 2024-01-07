const managerModel =require('../models/managerModel');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')

const maxAge=3 * 24 * 60 * 60;//3 days
createToken=(id)=>{
  return jwt.sign({id},'mnikhil1011',{
    expiresIn: maxAge
  })
}

const signup= async(req,res)=>{

 
  const {emailID,password}=req.body;
  const manager=await managerModel.findOne({emailID})

  if(!manager){ 
    try{
      const manager=await managerModel.create({emailID,password,valid:0})
      console.log(manager);
      // const token=createToken(manager._id)
      // res.cookie('managerid',token, { httpOnly: true, maxAge: maxAge * 1000 })
      return res.status(200).json(manager);
    }
    catch(err){
      return res.status(400).json({error:err});
    }
    
  }
  else{
    return res.status(400).json({error:"already exists"});
  }

}

const login= async(req,res)=>{
  const {emailID,password}=req.body;
  try{
    manager=await managerModel.login(emailID,password)
  }
  catch(e){
    return res.status(400).json({error:e.message});
  }

  const token=createToken(manager._id)
  res.cookie('managerid',token, { httpOnly: true, maxAge: maxAge * 1000 })
  return res.status(200).json(manager);
}

//we set lifetime to 1 ms so it goes
const logout= async(req,res)=>{
  console.log("okkk")
  res.cookie('managerid','',{maxAge:1});
  return res.status(200).json('')
}
const getall= async(req,res)=>{
  const managers= await managerModel.find({valid:false});
  return res.status(200).json(managers);
}

module.exports={
  signup,
  login,
  logout,
  getall
}