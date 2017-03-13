import Router from 'koa-router'
import User from '../models/userseric'
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
const router = new Router({
  prefix: '/v1/data'
})



// const SearchStrategy = {
//   ['H2']:
//     (Num, option)=>{
//       H2modeStrategy[Num](option)
//     }
//   ,
//   ['CDM']:
//   (Num, option)=>{
//     CDMmodeStrategy[Num](option)
//   }
// }
//
// const H2modeStrategy = {
//   ['0']:
//     async(option)=>{
//       const data = await H2.find({toolname : option}, (err, result)=>{
//       }
//       )
//       console.log('data')
//       console.log(data)
//     }
//   ,
//   ['1']:
//     async(option)=>{
//       const data = await H2.find({fw : option}, (err, result)=>{
//       }
//       )
//       console.log('data')
//       console.log(data)
//     }
// }
//
// const CDMmodeStrategy = {
//   ['0']:
//     async(option)=>{
//       const data = await CDM.find({toolname : option}, (err, result)=>{
//       }
//       )
//       console.log('data')
//       console.log(data)
//     }
//   ,
//   ['1']:
//     async(option)=>{
//       const data = await CDM.find({fw : option}, (err, result)=>{
//       }
//       )
//       console.log('data')
//       console.log(data)
//     }
// }

const SearchStrategy = {
  ['H2']:
    async(option)=>{
      const data = await H2.findById(option)
      return data
      console.log('data')
      console.log(data)
    }
  ,
  ['CDM']:
    async(option)=>{
      const data = await CDM.findById(option)
      return data
      console.log('data')
      console.log(data)
    }
}





router.get('/searchUser',
  validate({
    'user:query' : ['require', 'user is required']
  }),
  async(ctx, next) => {
    try {
      const date = []
      const dataArr = []
      const {user} = ctx.request.query
      const H2data = await H2.find({tester : user})
      const CDMdata = await CDM.find({tester : user})
      dataArr.push(...H2data)
      dataArr.push(...CDMdata)
      dataArr.forEach(arr=>{
        const myDate = arr.createddate
        const yeartemp = myDate.getFullYear()
        const monthtemp = myDate.getMonth()+1
        const temp = yeartemp*100 + monthtemp
        date.push(temp)
      })
        const allDate = Array.from( new Set(date) )
        allDate.sort()
        ctx.response.body = {
        allDate: allDate,
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

router.get('/searchDate',
  validate({
    'date:query': ['require', 'date is required'],
    'user:query' : ['require', 'user is required']
  }),
  async(ctx, next) => {
    try {
      const dataArr = []
      const result = []
      const {date, user} = ctx.request.query
      const year = Math.floor(date/100)
      const month = date%100
      const H2data = await H2.find({tester : user})
      const CDMdata = await CDM.find({tester : user})
      dataArr.push(...H2data)
      dataArr.push(...CDMdata)
      dataArr.forEach(arr=>{
        const myDate = arr.createddate
        const yeartemp = myDate.getFullYear()
        const monthtemp = myDate.getMonth()+1
        if((yeartemp == year)&&(monthtemp == month)){
          result.push(arr)
        }
      })
      console.log(result)

      ctx.response.body = {
      dataPackage: result,
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


router.get('/searchResult',
  validate({
    'tester:query': ['require', 'tester id is required'],
    'toolname:query': ['require', 'toolname is required'],
    '_id:query': ['require', 'data id is required']
  }),
  async(ctx, next) => {
    try {
      const {tester, toolname, _id} = ctx.request.query
      const {nickname} = await User.findById(tester)
      const result  = await SearchStrategy[toolname](_id)
      ctx.response.body = {
        user: nickname,
        dataPackage: result,
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


// router.get('/',
//   validate({
//     'tool:query': ['require', 'tool is required'],
//     'caseNum:query': ['require', 'caseNum is required'],
//     'request:query': ['require', 'request is required']
//   }),
//   async(ctx, next) => {
//     try {
//       const tool = ctx.request.query.tool
//       const caseNum = ctx.request.query.caseNum
//       const request = ctx.request.query.request
//       console.log(request)
//       //await next()
//       const obj = {}
//       obj['mode'] = caseNum
//       await SearchStrategy[tool](caseNum, request)//awiat yield?
//       //console.log(data)
//
//       ctx.response.body = {
//         status: 'success'
//       }
//     } catch(err) {
//       if (err.output.statusCode) {
//         ctx.throw(err.output.statusCode, err)
//       } else {
//         ctx.throw(500, err)
//       }
//     }
//   }
// )

export default router
