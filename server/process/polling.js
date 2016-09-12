import co from 'co'
import path from 'path'
import { myExec } from './utils'
import '../config/database'
import Tool from '../models/tools'
import { getDataFromCDM } from '../utils/parse'

const ToolStrategies = {
  ['CDM']: async (program, { mode, runs, size }) => {
    return await myExec(`start ${program} ${mode} ${runs} ${size}`)
  },
  ['H2']: async (program) => {
    return await myExec(`node ${program}`)
  },
  ['EMAIL']: () => {
    return {}
  }
}

const parseLogStrategies = {
  ['CDM']: async (log) => {
    return await getDataFromCDM(log)
  },
}

const foo = co.wrap(function* () {
  while (true) {
    try {
      const tool = yield Tool.findOneAndUpdate({ status: 'ready' }, { $set: {
        status: 'executing'
      }})
      if (tool !== null) {
        const { toolname, randomTag, CDM } = tool
        const program = path.resolve(__dirname, `../utils/exe/${toolname}.exe`)
        const txt = path.resolve(__dirname, `../utils/exe/${toolname}.txt`)
        yield ToolStrategies[toolname](program, tool[toolname])
        const parsedData = yield parseLogStrategies[toolname](txt)
        console.log(parsedData)
        yield tool.update({ $set: { status: parsedData.status }})
      }
    } catch (err) {
      console.log('error')
      console.log(err)
    }
  }
})

process.on('message', (msg) => {
  foo()
})

