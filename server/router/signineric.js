import Router from 'koa-router'
import User from '../models/userseric'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import {TokenStrategy, TokenVerify} from '../utils/token'
import {isUserUniqueSignIn} from '../utils/signin'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/signineric'
})



router.post('/',
  validate({
    'email:body':['require', 'isEmail', 'e-mail is required/ not e-mail'],
    'password:body':['require', 'password is required']
  }),
  async(ctx, next)=>{
    try {
      console.log('checkk')
      const {email, password} = ctx.request.body
      const user = await isUserUniqueSignIn(email)
      if(user){
        const check = await user.validatePassword(password)
        if(check){
          if(user.actived){
            ctx.status = 200
            ctx.message = "success"
            ctx.response.body = {
              message: "登入成功",
              auth: user.auth,
              login: true
            }
          }else{
            ctx.status = 200
            ctx.message = "Your account is not actived"
            ctx.response.body = {
              message: "此帳號沒開通",
              login: false
            }
          }
        }else{
          ctx.status = 200
          ctx.message = "password error"
          ctx.response.body = {
            message: "密碼錯誤",
            login: false
          }
        }
      }else{
        ctx.status = 200
        ctx.message = "This account is not existed."
        ctx.response.body = {
          message: "無此帳號",
          login: false
        }
      }
    } catch (err) {
      console.log(err)
      if(err.output.statusCode){
        ctx.throw(err.output.statusCode, err)
      }else {
        ctx.throw(500, err)
      }
    }
  }
)

router.post('/authentication',
  validate({
    'auth:body':[]
  }),
  async(ctx,next)=>{
    try {
      const {auth} = ctx.request.body
      const userDBInfo = await User.findOne({auth})
      if(userDBInfo){
        ctx.status = 200
        ctx.message = "pass"
        ctx.response.body = {
          message: "PASS",
          done: true
        }
      }else {
        ctx.status = 200
        ctx.message = "deny"
        ctx.response.body = {
          message: "Deny",
          done: false
        }
      }
    } catch (err) {
      console.log(err)
      if(err.output.statusCode){
        ctx.throw(err.output.statusCode, err)
      }else {
        ctx.throw(500, err)
      }
    }
  }
)

export default router
