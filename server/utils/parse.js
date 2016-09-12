import fs from 'fs'

export const getDataFromCDM = (filename) => {
  return new Promise((resolve, reject) => {
  	fs.readFile(filename, (err, data) => {
  		if (err) { return reject(err) }

  		const obj = {}
  		data = data.toString().split('\r\n')
  		if (data.length < 2) {
				obj.status = 'failure'
  			return resolve(obj)			
  		}
  		obj['mode'] = parseInt(data[0].split(', ')[0].split(': ')[1])
  		obj['runs'] = parseInt(data[0].split(', ')[1].split(': ')[1])
  		obj['size'] = parseInt(data[0].split(', ')[2].split(': ')[1])
  		let mul = (obj.mode === 0) ? 8 : 4 
  		const SR = [], SW = [], RR512 = [], RW512 = [], RR4 = [], RW4 = []

  		for (let i = 2; i <= mul * (obj.runs - 1) + 2; i = i + mul) {
  			switch(obj.mode) {
  				case 0:
  				  SR.push(parseFloat(data[i + 1].split(':')[1]))
  					SW.push(parseFloat(data[i + 2].split(':')[1]))
  					RR512.push(parseFloat(data[i + 3].split(':')[1]))
  					RW512.push(parseFloat(data[i + 4].split(':')[1]))
  					RR4.push(parseFloat(data[i + 5].split(':')[1]))
  					RW4.push(parseFloat(data[i + 6].split(':')[1]))
  				break
  				case 1:
  				  SR.push(parseFloat(data[i + 1].split(':')[1]))
  					SW.push(parseFloat(data[i + 2].split(':')[1]))
  				break
  				case 2:
  				  RR512.push(parseFloat(data[i + 1].split(':')[1]))
  					RW512.push(parseFloat(data[i + 2].split(':')[1]))
  				break  	
  				case 3:
  				  RR4.push(parseFloat(data[i + 1].split(':')[1]))
  					RW4.push(parseFloat(data[i + 2].split(':')[1]))
  				break  	  				  				  					
  			}
  		}

  		const all = [], allValue = []
			switch(obj.mode) {
				case 0:
		  		all.push(SR, SW, RR512, RW512, RR4, RW4)
		  		all.map((arr, index) => {
		  			allValue[index] = arr.reduce((prev, next) => {
		  				return prev + next
		  			}, 0)
		  			allValue[index] = allValue[index] / obj.runs 
		  		})

		  		obj.data = {
		  			'SR': allValue[0],
		  			'SW': allValue[1],
		  			'RR512': allValue[2],
		  			'RW512': allValue[3],
		  			'RR4': allValue[4],
		  			'RW4': allValue[5]
		  		}				  
				break
				case 1:
		  		all.push(SR, SW)
		  		all.map((arr, index) => {
		  			allValue[index] = arr.reduce((prev, next) => {
		  				return prev + next
		  			}, 0)
		  			allValue[index] = allValue[index] / obj.runs 
		  		})

		  		obj.data = {
		  			'SR': allValue[0],
		  			'SW': allValue[1]
		  		}				  
				break			
				case 2:
		  		all.push(RR512, RW512)
		  		all.map((arr, index) => {
		  			allValue[index] = arr.reduce((prev, next) => {
		  				return prev + next
		  			}, 0)
		  			allValue[index] = allValue[index] / obj.runs 
		  		})

		  		obj.data = {
		  			'RR512': allValue[0],
		  			'RW512': allValue[1]
		  		}				  
				break	
				case 3:
		  		all.push(RR4, RW4)
		  		all.map((arr, index) => {
		  			allValue[index] = arr.reduce((prev, next) => {
		  				return prev + next
		  			}, 0)
		  			allValue[index] = allValue[index] / obj.runs 
		  		})

		  		obj.data = {
		  			'RR4': allValue[0],
		  			'RW4': allValue[1]
		  		}				  
				break										
			}
			obj.status = 'success'

  		resolve(obj)
  	})
  })
}

//../../node_modules/.bin/babel-node ./parse.js

getDataFromCDM('./exe/CDM.txt').then(data => {
	console.log(data)
})
