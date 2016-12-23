import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'
import bcrypt from 'bcryptjs-then'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  nickname : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  hashedPassword : {
    type : String
  },
  auth : {
    token : String
  },
  actived : {
    type : Boolean,
    default : false
  }
})

UserSchema.virtual('password1')
  .set(function(value){
    this.virtualpassword = value
    console.log(value)
  })
  .get(function(){
    return this.virtualpassword
  })

UserSchema.pre('save', async function(next){
  if(!this.password1){
    next()
  }

  try {
    this.hashedPassword = await bcrypt.hash(this.password1)
    //const check = await bcrypt.compare(this.password, this.hashedPassword)
    next()
  } catch (err) {
    next(err)
  }

})

UserSchema.methods.validatePassword = async function(SigninPassword){
  try {
    return await bcrypt.compare(SigninPassword, this.hashedPassword)
  } catch (err) {
    console.log(err)
    throw err
  }
}

export default mongoose.model('Usereric', UserSchema)
