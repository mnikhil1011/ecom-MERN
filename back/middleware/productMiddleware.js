const jwt = require('jsonwebtoken');

const managermiddle=(req,res,next)=>{
  const token=req.cookies.managerid;
  if(!token){
    return res.status(401).json({error:"no token present"})
  }
  jwt.verify(token,"mnikhil1011",(err,mID)=>{
    if(err){
      return res.status(401).json({error:"wrong token present"})
    }
    req.mID=mID.id;
    next();
  })
}

const usermiddle=(req,res,next)=>{
  const token=req.cookies.userid;
  if(!token){
    return res.status(401).json({error:"no token present"})
  }
  jwt.verify(token,"mnikhil1011",(err,userid)=>{
    if(err){
      return res.status(401).json({error:"wrong token present"})
    }
    req.userid=userid.id;
    next();
  })
}

module.exports={
  managermiddle,
  usermiddle
}