import port from './env/port'
import jwt from './env/jwt'
import mail from './env/mail'

const env = process.env.NODE_ENV || 'development'
const config = require(`./env/${env}`).default

export default {
  ...port,
  ...config,
  ...jwt,
  ...mail
}
