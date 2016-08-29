import { myExec } from './utils'
import path from 'path'
import '../config/database'
import Tool from '../models/tools'

process.on('message', async (msg) => {
  setInterval(async () => {
    try {
      const program = path.resolve(__dirname, '../utils/exe/test.js')
      const tool = await Tool.findOneAndUpdate({ status: 'ready' }, { $set: {
        status: 'execute'
      }})
      await myExec(`node ${program}`)
    } catch (err) {
      console.log('error')
      console.log(err)
    }
  }, 1000)
