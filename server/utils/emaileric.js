import nodemailer from "nodemailer"
import config from "../config"
import {TokenStrategy} from "./token"

const transporter = nodemailer.createTransport({
  /*service: 'Gmail',
  auth: {
    user: 'smalleareric@gmail.com',
    password:
  }*/
  host: config.watConfig.host,
  port: config.watConfig.port,
  auth: config.watConfig.auth,
  logger: config.watConfig.logger

})

export function mailTransport(userInfo, routePath, token){

  console.log(token)
  const option = {
    from: config.watSender,
    to: userInfo.email,
    subject: `Hello ${userInfo.nickname}`,
    //text: 'Click here to activate your account: http://www.google.com.tw', // plaintext body
    //html: '<h1><a href="www.google.com.tw">Click here to activate your account</a></h1>'
    text: 'Click here to activate your account: http://www.google.com.tw', // plaintext body
    html:
    `<h1>Hi ${userInfo.nickname}</h1>
    <h2><a href="http://localhost:3000/${routePath}?token=${token}">"http://localhost:3000/${routePath}?token=${token}"</a></h2>`
  }

  transporter.sendMail(
    option,function(err,info){
      if(err){
        console.log('err')
        console.log(err)
      }else{
        console.log('info.response')
        console.log(info.response)
      }
    }
  )
}
