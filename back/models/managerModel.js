const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const managerSchema=new mongoose.Schema({
    emailID :{
      type: String,
      required: true
    },
    password :{
      type: String,
      required: true
    },
    valid:{
      type: Boolean,
      required:true
    }
})

managerSchema.pre('save',async function(next){
  const salt=await bcrypt.genSalt();
  this.password=await bcrypt.hash(this.password,salt);
  next();
})

managerSchema.statics.login=async function(emailID,password){
  const manager=await this.findOne({emailID})
  if(!manager)
    throw Error('no such manager')
  const auth=await bcrypt.compare(password,manager.password);
  if(!auth)
    throw Error('wrong password')
  if(!manager.valid)
  throw Error('approval pending')
  return manager;
}

module.exports =mongoose.model('manager',managerSchema);

