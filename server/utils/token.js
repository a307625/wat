import jwt from 'koa-jwt'
import Config from '../config'

export const TokenStrategy = {//jwt.sign(payload, secretOrPrivateKey, options, [callback])
  ['JWT']: (email, nickname)=>{
    return jwt.sign({email, nickname}, Config.jwt.jwtSecret, {algorithm: 'HS512', expiresIn:Config.jwt.jwtTokenExpiresIn})
  },
  ['EMAIL']: (email, nickname, _id)=>{
    return jwt.sign({email, nickname, _id}, Config.jwt.jwtSecret, {algorithm: 'HS256', expiresIn: Config.jwt.emailTokenExpiresIn})
  }
}

//jwt.verify(token, secretOrPublicKey, [options, callback])
export const TokenVerify = (token) => {
  return new Promise((resolve, reject)=>{
    jwt.verify(token, Config.jwt.jwtSecret, (err, decoded)=>{
      if(err){
        reject(err)
      }
      resolve(decoded)
    })
  })
}
