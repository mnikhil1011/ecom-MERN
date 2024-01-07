const adminModel =require('../models/adminModel');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const managerModel=require('../models/managerModel')

const maxAge=3 * 24 * 60 * 60;//3 days
createToken=(id)=>{
  return jwt.sign({id},'mnikhil1011',{
    expiresIn: maxAge
  })
}

const login= async(req,res)=>{
  const {emailID,password}=req.body;
  try{
    admin=await adminModel.login(emailID,password)
  }
  catch(e){
    return res.status(400).json({error:e.message});
  }

  const token=createToken(admin._id)
  res.cookie('adminid',token, { httpOnly: true, maxAge: maxAge * 1000 })
  return res.status(200).json(admin);
}

//we set lifetime to 1 ms so it goes
const logout= async(req,res)=>{
  console.log("okkk")
  res.cookie('adminid','',{maxAge:1});
  return res.status(200).json('')
}

const rejectRequest= async(req,res)=>{
  const {emailID,password}=req.body;
  const manager=await managerModel.findOneAndDelete({emailID})
  return res.status(200).json(manager)
  
}

const acceptRequest= async(req,res)=>{
  const {emailID}=req.body;
  const manager=await managerModel.findOneAndUpdate({emailID},{valid:1});
  return res.status(200).json(manager)
  
  
}

module.exports={
  login,
  logout,
  rejectRequest,
  acceptRequest
}