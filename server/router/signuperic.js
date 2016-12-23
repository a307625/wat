import Router from 'koa-router'
import User from '../models/userseric'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import _ from 'underscore'
import {isUserUniqueSignUp, isUser, isUserPassword, msgStrategy} from '../utils/signup'
import {mailTransport} from '../utils/emaileric'
import {TokenStrategy, TokenVerify} from '../utils/token'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/signuperic'
})


//註冊
router.post('/',
  validate({
    'nickname:body':['require', 'isAlphanumeric', 'nickname is required/not Alphanumeric'],
    'email:body':['require', 'isEmail', 'e-mail is required/ not e-mail'],
    'password1:body':['require', 'password is required'],
    'password2:body':['require', 'password is required']
  }),
  async(ctx,next)=>{
    try {
      const {email, nickname, password1, password2} = ctx.request.body
      const userDBInfo = await isUserUniqueSignUp({email})
      if(password1 == password2)
      {
        if(userDBInfo && userDBInfo.actived){//have registered
          ctx.status = 200
          ctx.message = "This e-mail has been registered"
          ctx.response.body = {
            message: "此信箱已被註冊",
            register: false
          }
        }else{
          const user = new User(
            ctx.request.body
          )
          await user.save()
          console.log("UUUUUUUUUUUUUUUUer")
          console.log(user)
          const token = await TokenStrategy['EMAIL'](email, nickname, user._id)
          await mailTransport({email, nickname}, 'verification', token)
          ctx.status = 200
          ctx.message = "success"
          ctx.response.body = {
            message: "註冊成功,請至信箱讀取認證信以開通帳號",
            register: true
          }
        }
      }else{
        ctx.status = 200
        ctx.message = "password error"
        ctx.response.body = {
          message: "密碼錯誤,請重新輸入密碼",
          register: false
        }
      }
    }catch(err) {
      console.log(err)
      if(err.output.statusCode){
        ctx.throw(err.output.statusCode, err)
      }else {
        ctx.throw(500, err)
      }
    }
  }
)

//重寄認證信
router.post('/authentication',
  validate({
    'nickname:body':['require', 'isAlphanumeric', 'nickname is required/not Alphanumeric'],
    'email:body':['require', 'isEmail', 'e-mail is required/ not e-mail'],
    'password1:body':['require', 'password is required'],
    'password2:body':['require', 'password is required']
  }),
  async(ctx,next)=>{
    try {
      const {email, nickname, password1, password2} = ctx.request.body
      const allUsers = await isUser({email, nickname})
      let msgBox
      if(allUsers.length){
        const userDBInfo = await isUserPassword(allUsers, password1)
        if(userDBInfo && (password1 == password2)){
          if(userDBInfo.actived){
            msgBox = msgStrategy['actived']()
          }else{
            const token = await TokenStrategy['EMAIL'](email, nickname, userDBInfo._id)
            console.log(token)
            await mailTransport({email, nickname}, 'verification', token)
            msgBox = msgStrategy['resend']()
          }
        }else {
          msgBox = msgStrategy['passwordErr']()
        }
      }else{
        msgBox = msgStrategy['noUser']()
      }

      ctx.status = msgBox.status
      ctx.message = msgBox.message
      ctx.response.body = {
        data: msgBox.data
      }
    }catch(err) {
      console.log(err)
      if(err.output.statusCode){
        ctx.throw(err.output.statusCode, err)
      }else {
        ctx.throw(500, err)
      }
    }
  }
)

//認證信驗證
router.get('/verification',
  validate({
    'token:query':['require','token is required']
  }),
  async(ctx, next)=>{
    try {
      const token = ctx.request.query.token
      const {email, nickname, _id} = await TokenVerify(token)
      const check = await isUserUniqueSignUp({email, nickname, _id})
      if(check){
        const tokenAuth = await TokenStrategy['JWT'](email, nickname)
        await User.findOneAndUpdate({email, nickname, _id },{
            actived: true,
            auth: tokenAuth
        })
        await User.find({email, "actived": false}).remove()
      }
      else{
        console.log("search err")
      }
      ctx.response.body = {
        status: "success"
      }
    } catch (err) {
      if(err.output.statusCode){
        ctx.throw(err.output.statusCode, err)
      }else{
        ctx.throw(500, err)
      }
    }
  }
)


export default router
