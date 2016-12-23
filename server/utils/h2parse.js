import fs from 'fs'

export const getDataFromH2 = (filename) => {
  return new Promise((resolve, reject) => {
  	fs.readFile(filename, (err, data) => {
  		if (err) { return reject(err) }

  		const obj = {}
  		data = data.toString().split('\r\n')
      data = data[0].toString().split(': ')
  	  obj.status = data[1]
  		resolve(obj)
  	})
  })
}


getDataFromH2('./exe/H2.txt').then(data => {
	console.log(data)
})
