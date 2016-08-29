import jwt from 'koa-jwt'
import Config from '../config'

export const getToken = {
  ['JWT'](email) {
    return jwt.sign({ email }, Config.jwt.jwtSecret, { algorithm: 'HS512', expiresIn: Config.jwt.jwtTokenExpiresIn })
  },
  ['EMAIL'](email) {
    return jwt.sign({ email }, Config.jwt.jwtSecret, { algorithm: 'HS256', expiresIn: Config.jwt.emailTokenExpiresIn })
  }
}

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, Config.jwt.jwtSecret, (err, decoded) => {
      if (err) {
        return reject(err)
      }
      resolve(decoded)
    })
  })
}

export const getCleanUser = (user) => {
  const u = user.toObject()
  return {
    id: u._id,
    username: u.username,
    email: u.email,
    created_time: u.createdAt,
    updated_time: u.updatedAt
  }
}
