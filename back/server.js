const express=require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const cookieParser = require('cookie-parser');

//routes
const userRoute=require('./routes/userRoute');
const manaagerRoute=require('./routes/managerRoute')
const adminRoute=require('./routes/adminRoute');
const productRoute=require('./routes/productRoute')



const app=express();

//convert from json
app.use(express.json())
app.use(cookieParser())

//console log the req path
app.use((req,res,next)=>{
    console.log(req.path,"  " ,req.method)
    console.log(req.body)
    next();
})

app.use('/api/user',userRoute)

app.use('/api/manager',manaagerRoute)

app.use('/api/admin',adminRoute)

app.use('/api/product',productRoute)


// connect and listen to db
mongoose.connect(process.env.DB_URI)
  .then(()=>{
    app.listen(process.env.PORT,()=>{
      console.log("connected to db and now listening");
    })
  })
  .catch((err)=>{
    console.log(err);
  })
