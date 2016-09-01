import { myExec } from './utils'
import path from 'path'
import '../config/database'
import Tool from '../models/tools'

const ToolStrategy = {
  ['CDM']: async (program, { mode, runs, size}) => {
    return await myExec(`node ${program} ${mode} ${runs} ${size}`)
  },
  ['H2']: async (program) => {
    return await myExec(`node ${program}`)
  },
  ['EMAIL']: () => {
    return {}
  }
}

const parseBatchLog = (str) => {
  let result = 'failure'
	str.split(/\r\n|\r|\n/).map((value, index) => {
		if (value === 'success') {
			result = value
		}
	})

	return result
}

process.on('message', async (msg) => {
  setInterval(async () => {
    try {
      const pass = Tool.findOne
      const tool = await Tool.findOneAndUpdate({ status: 'ready' }, { $set: {
        status: 'executing'
      }})

      if (tool !== null) {
        const { toolname, randomTag } = tool
        const program = path.resolve(__dirname, `../utils/exe/${toolname}.js`)
        //從策略中找到對應的 [toolname]，接著把工具程序路徑 (program) 與參數 (tool[toolname]) 丟進去
        const log = await ToolStrategy[toolname](program, tool[toolname])
        const result = parseBatchLog(log)
        await tool.update({ $set: { status: result }})
        if (result === 'failure') {
          await Tool.update({ status: 'ready' }, { status: 'stop' }, { multi: true })
        }
      }
    } catch (err) {
      console.log('error')
      console.log(err)
    }
  }, 1000)
})
