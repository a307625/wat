import co from 'co'
import path from 'path'
import { myExec } from './utils'
import '../config/database'
import Tool from '../models/tools'
import H2 from '../models/h2'
import CDM from '../models/CDM'
import { getDataFromCDM } from '../utils/parse'
import { getDataFromH2 } from '../utils/h2parse'
import moment from 'moment'

const ToolStrategies = {
  ['CDM']: async (program, { mode, runs, size }) => {
    return await myExec(`start ${program} ${mode} ${runs} ${size}`)
  },
  ['H2']: async (program) => {
    return await myExec(`start ${program}`)
  },
  ['EMAIL']: () => {
    return {}
  }
}

const ToolDBStrategies = {
  ['CDM']: async ( tester, fw, {status, data}, createddate ) => {
    const TestResult = new CDM({
      tester: tester,
      fw: fw,
      toolname: 'CDM',
      status: status,
      data: data,
      createddate: createddate
    })
    await TestResult.save()
  },
  ['H2']: async ( tester, fw, {status, data}, createddate ) => {
    const TestResult = new H2({
      tester: tester,
      fw: fw,
      toolname: 'H2',
      status: status,
      data: 'NULL',
      createddate: createddate
    })
    await TestResult.save()
  },
  ['EMAIL']: () => {
    return {}
  }
}

const parseLogStrategies = {
  ['CDM']: async (log) => {
    return await getDataFromCDM(log)
  },
  ['H2']: async (log) => {
    return await getDataFromH2(log)
  }
}

const foo = co.wrap(function* () {
  while (true) {
    try {
      const tool = yield Tool.findOneAndUpdate({ status: 'ready' }, { $set: {
        status: 'executing'
      }})

      if (tool !== null) {
        const { fw, toolname, randomTag, createddate, tester } = tool
        const program = path.resolve(__dirname, `../utils/exe/${toolname}.exe`)
        const txt = path.resolve(__dirname, `../utils/exe/${toolname}.txt`)
        yield ToolStrategies[toolname](program, tool[toolname])
        const parsedData = yield parseLogStrategies[toolname](txt)
        console.log(parsedData)
        console.log(createddate)
        yield ToolDBStrategies[toolname]( tester, fw, parsedData, createddate )
        yield tool.update({ $set: { status: parsedData.status, updateddate: moment(Date.now() + 8 * 60 * 60 * 1000) }})
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
