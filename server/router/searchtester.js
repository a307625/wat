import Router from 'koa-router'
import User from '../models/users'
import H2 from '../models/h2'
import CDM from '../models/CDM'
import Boom from 'boom'
import _ from 'underscore'
import nodemailer from 'nodemailer'
import convert from 'koa-convert'
import _validate from 'koa-req-validator'
import { getToken, verifyToken, getCleanUser } from '../utils'
import { mailTransport, checkEmailStatus } from '../utils/email'
import Config from '../config'
import fs from 'fs'

const validate = (...args) => convert(_validate(...args))
const router1 = new Router({
  prefix: '/v1/searchtester'
})



const SearchStrategy = {
  ['H2']:
    (Num, option)=>{
      H2modeStrategy[Num](option)
    }
  ,
  ['CDM']:
  (Num, option)=>{
    CDMmodeStrategy[Num](option)
  }
}

const H2modeStrategy = {
  ['0']:
    async(option)=>{
      const data = await H2.find({toolname : option}, (err, result)=>{
      }
      )
      console.log('data')
      console.log(data)
    }
  ,
  ['1']:
    async(option)=>{
      const data = await H2.find({fw : option}, (err, result)=>{
      }
      )
      console.log('data')
      console.log(data)
    }
}

const CDMmodeStrategy = {
  ['0']:
    async(option)=>{
      const data = await CDM.find({toolname : option}, (err, result)=>{
      }
      )
      console.log('data')
      console.log(data)
    }
  ,
  ['1']:
    async(option)=>{
      const data = await CDM.find({fw : option}, (err, result)=>{
      }
      )
      console.log('data')
      console.log(data)
    }
}



router1.get('/',
  validate({
    'tool:query': ['require', 'tool is required'],
    'caseNum:query': ['require', 'caseNum is required'],
    'request:query': ['require', 'request is required']
  }),
  async(ctx, next) => {
    try {
      const tool = ctx.request.query.tool
      const caseNum = ctx.request.query.caseNum
      const request = ctx.request.query.request
      console.log(request)
      //await next()
      const obj = {}
      obj['mode'] = caseNum
      await SearchStrategy[tool](caseNum, request)//awiat yield?
      //console.log(data)

      ctx.response.body = {
        status: 'success'
      }
    } catch(err) {
      if (err.output.statusCode) {
        ctx.throw(err.output.statusCode, err)
      } else {
        ctx.throw(500, err)
      }
    }
  }
)

export default router1
