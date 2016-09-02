import { exec, execFile } from 'child_process'

export const myExec = (script) => {
	return new Promise((resolve, reject) => {
		exec(script, (err, stdout, stderr) => {
			if (err) {
				return reject(stderr)
			} else {
				//process.stdout.write(stdout)
				//console.log(stdout)
				resolve(stdout)
			}
		})
	})
}
