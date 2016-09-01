console.log('I\'m CDM')
console.log(Math.random() * 100)
process.argv.slice(2).forEach(x => {
  console.log(x)
})

if (process.argv[3] === '2') {
  console.log('success')
} else {
  console.log('failure')
}
