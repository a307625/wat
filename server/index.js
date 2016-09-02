//mongod --dbpath ~/data/db/
// /c/Program\ Files/MongoDB/Server/3.2/bin/mongod --dbpath ~/data/db
import Koa from 'koa'
import convert from 'koa-convert'
import path from 'path'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'

import serve from 'koa-static'
import historyApiFallback from 'koa-connect-history-api-fallback'

import webpack from 'webpack'
import WebpackDevMiddleware from "koa-webpack-dev-middleware"
import WebpackHotMiddleware from "koa-webpack-hot-middleware"
import webpackConfig from '../webpack.config'

import jwt from 'koa-jwt'

import Router from 'koa-router'
import signupRouter from '../server/router/signup'
import toolRouter from '../server/router/tools'

import './config/database'
import Config from './config'

import exe from './process'

const app = new Koa()

app.use(async(ctx, next) => {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) {
      ctx.throw(404)
    }
  } catch (err) {
    //console.log(err.message)  //real error message
    //console.log(err.status)   //status code
    //console.log(err.name)     //status code name
    ctx.status = err.status || 500
    ctx.body = {
      status: 'error',
      errors: {
        message: err.message
      }
    }
    if (ctx.status >= 500) {
      ctx.app.emit('internalError', err, ctx)
    }
  }
})

app.on('internalError', (err, ctx) => {
  console.log(err)
  console.log('Maybe someone is hacking your server')
})

app.use(convert(bodyParser()))
app.use(convert(historyApiFallback({
  verbose: false
})))

const compiler = webpack(webpackConfig)
app.use(convert(WebpackDevMiddleware(compiler, {
  hot: true,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  historyApiFallback: true
})))

app.use(convert(WebpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
})))

app.use(serve(__dirname + '/../public'))
app.use(convert(jwt({
  secret: process.env.JWT_SECRET
}).unless({
  path: [
    '/v1/signup',
    '/v1/tools',
    '/favicon.ico'
  ]
})))

app.use(signupRouter.routes())
app.use(signupRouter.allowedMethods({
  throw: true
}))

app.use(toolRouter.routes())
app.use(toolRouter.allowedMethods({
  throw: true
}))

app.listen(Config.port, () => {
  console.log(`listening on port ${Config.port}`)
})

export default app
