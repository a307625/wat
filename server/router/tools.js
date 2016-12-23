import Router from 'koa-router'
import Tool from '../models/tools'
import H2 from '../models/h2'
import Boom from 'boom'
import _ from 'underscore'
import nodemailer from 'nodemailer'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import uuid from 'node-uuid'
import { getToken, verifyToken, getCleanUser } from '../utils'
import { mailTransport, checkEmailStatus } from '../utils/email'
import Config from '../config'


const validate = (...args) => convert(_validate(...args))
const router = new Router({
  prefix: '/v1/tools'
})

const ToolStrategy = {
  ['CDM']: ({ mode, runs, size }) => {
    return {
      mode,
      runs,
      size
    }
  },
  ['H2']: () => {
    return {}
  },
  ['EMAIL']: () => {
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
      console.log(tasks)
      const randomTag = uuid.v4()
      tasks.forEach(async task => {
        const { toolname } = task
        const { fw } = task
        const tool = new Tool({
          //要記得先從 token 去解回 user 的 ObjectId
          tester: '57bd7a333f7045152f6a9762',
          fw,
          toolname,
          randomTag,
          [toolname]: ToolStrategy[toolname](task)
        })
        console.log(toolname)

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

export default router
