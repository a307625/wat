import Boom from 'boom'
import nodemailer from 'nodemailer'
import { getCleanUser } from '../utils'
import Config from '../config'

export async function checkEmailStatus(ctx, next) {
  const nodemailerInfo = ctx.state.nodemailerInfo,
        user = getCleanUser(ctx.state.user)

  if (nodemailerInfo.rejected.length === 0) {
    ctx.response.body = {
      status: 'success'
    }
  } else {
    throw Boom.badImplementation('Your data is bad and you should feel bad')
  }
}

export function mailTransport(userInfo, routePath, option, emailToken = undefined) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport(Config.watConfig)
    let message
    if (emailToken) {
      message = {
        ...Config.registerMailTemplate,
        from: Config.watSender,
        to: userInfo.email,
        html:
          `<h1>Hi ${userInfo.nickname}</h1>
           <h2>
             <a href='http://localhost:3000/${routePath}/${emailToken}'>
               Click here to ${option} your account
             </a>
           </h2>`
      }
    } else {
      message = {
        ...Config.registerMailTemplate,
        to: userInfo.email,
        html:
          `<h1>Hi ${userInfo.nickname}</h1>
           <h2>
             Profile setting has been modified
           </h2>`
      }
    }

    transporter.verify((err, success) => {
      if (err) {
        const SMTPError = Boom.serverUnavailable('SMTP server unavailable to verify')
        return reject(SMTPError)
     } else {
       transporter.sendMail(message, (err, info) => {
         if (err) {
           const SMTPError = Boom.serverUnavailable('SMTP server unavailable to send')
           return reject(SMTPError)
         }
         resolve(info)
       })
     }
   })
  })
}
