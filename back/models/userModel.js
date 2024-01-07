const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    emailID :{
      type: String,
      required: true
    },
    password :{
      type: String,
      required: true
    },
    cart:[
      {
        name:{
          type:String
        },
        quantity:{
          type:Number
        }
      }
    ]

},{Timestamps:true})

userSchema.pre('save',async function(next){
  const salt=await bcrypt.genSalt();
  this.password=await bcrypt.hash(this.password,salt);
  next();
})

userSchema.statics.login=async function(emailID,password){
  const user=await this.findOne({emailID})
  if(!user)
    throw Error('no such user')
  const auth=await bcrypt.compare(password,user.password);
  if(!auth)
    throw Error('wrong password')
  return user;
}

module.exports =mongoose.model('user',userSchema);

