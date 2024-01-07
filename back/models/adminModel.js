const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const adminSchema=new mongoose.Schema({
    emailID :{
      type: String,
      required: true
    },
    password :{
      type: String,
      required: true
    }
},{Timestamps:true})


adminSchema.statics.login=async function(emailID,password){
  const admin=await this.findOne({emailID})
  if(!admin)
    throw Error('no such admin')
  const auth=await bcrypt.compare(password,admin.password);
  if(!auth)
    throw Error('wrong password')
  return admin;
}

module.exports =mongoose.model('admin',adminSchema);

