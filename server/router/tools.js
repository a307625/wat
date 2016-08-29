import Router from 'koa-router'
import Tool from '../models/tools'
import Boom from 'boom'
import _ from 'underscore'
import nodemailer from 'nodemailer'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import { getToken, verifyToken, getCleanUser } from '../utils'
import { mailTransport, checkEmailStatus } from '../utils/email'
import Config from '../config'

const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/tools'
})

const ToolStrategy = {
  ['CDM']: function({ mode, runs, size}) {
    return {
      mode,
      runs,
      size
    }
  },
  ['H2']: function() {
    return {}
  },
  ['EMAIL']: function() {
    return {}
  }
}

router.post('/',
  validate({
    'tasks:body': ['require', 'tasks are required or not valid']
  }),
  async(ctx, next) => {
    try {
      const { tasks } = ctx.request.body
      tasks.forEach(async task => {
        const { toolname } = task
        const tool = new Tool({
          //要記得先從 token 去解回 user 的 ObjectId
          tester: '57bd7a333f7045152f6a9762',
          toolname,
          [toolname]: ToolStrategy[toolname](task)
        })

        await tool.save()
      })

      ctx.response.body = {
        status: 'success'
      }
    } catch (err) {
      if (err.output.statusCode) {
        ctx.throw(err.output.statusCode, err)
      } else {
        ctx.throw(500, err)
      }
    }
  }
)

//Active the account, and verify the email token
router.get('/',
  validate({
    'token:query': ['require', 'token is required']
  }),
  async(ctx, next) => {
    try {
      const emailToken = ctx.request.query.token
      const { email } = await verifyToken(emailToken)
      const result = await User.findOneAndUpdate({ email }, {
        isEmailActived: true,
        verifyEmailToken: undefined
      })

      if (!result) {
        throw Boom.unauthorized('Email Token is not valid or expired')
      }
      const user = getCleanUser(result)
      const jwtToken = await getToken['JWT'](email)

      ctx.response.body = {
        status: 'success',
        auth: {
          token: jwtToken,
          ...user
        }
      }
    } catch(err) {
      if (err.output.statusCode) {
        ctx.throw(err.output.statusCode, err)
      } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        const TokenError = Boom.unauthorized('Email Token is not valid or expired')
      } else {
        ctx.throw(500, err)
      }
    }
  }
)

function isUserUnique(email) {
  return new Promise((resolve, reject) => {
    User.findOne({ email, isEmailActived: true }, (err, user) => {
      if (err) {
        return reject(err)
      }
      resolve(user)
    })
  })
}

export default router
