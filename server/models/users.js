import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'
//import bcrypt from 'bcrypt-as-promised'
import bcrypt from 'bcryptjs-then'
import Boom from 'boom'

const SALT_WORK_FACTOR = 10
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  hashedPassword: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  isEmailActived: {
    type: Boolean,
    default: false
  },
  verifyEmailToken: {
    type: String
  },
  isEmailDeleted: {
    type: Boolean,
    default: false
  }
})

UserSchema.plugin(timestamps)

UserSchema.path('username').required(true, 'username is required')
UserSchema.path('email').required(true, 'email is required')

UserSchema.virtual('password')
  .set(function(value) {
    this.__password = value
  })
  .get(function() {
    return this.__password
  })

UserSchema.pre('validate', function (next) {
  let err

  if (!this.password) {
    err = Boom.badData('Password is required')
    next(err)
  } else if (this.password.length < 6) {
    err = Boom.badData('Length of password must >= 6')
    next(err)
  }
  next()
})

UserSchema.pre('save', async function (next) {
  if (!this.password) {
    //return next()
    next()
  }
  try {
    this.hashedPassword = await bcrypt.hash(this.password)
    next()
  } catch (err) {
    const err = Boom.badImplementation('bcrypt error')
    next(err)
  }
})

UserSchema.methods.validatePassword = async function validatePassword(signinPassword) {
  try {
    return await bcrypt.compare(signinPassword, this.hashedPassword)
  } catch (err) {
    throw err
  }
}

export default mongoose.model('User', UserSchema)
