import { exec, fork } from 'child_process'

const child = fork(__dirname + '/polling.js')
child.send('start')

child.on('message', (msg) => {
  console.log('get polling back ', msg)
})

child.on('close', (code) => {
  console.log('get polling back code ', code)
})
