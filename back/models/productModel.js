const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name :{
      type: String,
      required: true
    },
    quantity :{
      type: Number,
      required: true
    },
    category:{
      type:String,
      required: true
    },
    mID:{
      type:String,
      required:true
    }
})


module.exports =mongoose.model('product',productSchema);

