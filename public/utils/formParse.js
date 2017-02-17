function parseStr(form, FWVer){
  const temp = form.map((arr)=>{
    const str =arr.name + arr.value
    return str
  })
  const taskStr = temp.join("")
  const taskArr =  taskStr.split("toolname")
  taskArr.shift()
  console.log(taskArr)
  const obj =  {}
  // const package = {}
  // package["tasks"] = []
  //
  const tasks = []
  taskArr.forEach(arr=>{

    let task = {}
    let tool = arr.split("runs")[0]
    console.log(tool)
    switch (tool) {
      case "H2":
        task["toolname"] = tool
        task["fw"] = FWVer
        task["runs"] = arr.split("runs")[1]
        break
      case "CDM":
        task["toolname"] = tool
        task["fw"] = FWVer
        task["runs"] = arr.split("runs")[1].split("mode")[0]
        task["mode"] = arr.split("runs")[1].split("mode")[1].split("size")[0]
        task["size"] = arr.split("runs")[1].split("mode")[1].split("size")[1]
        break
    }
    // package["tasks"].push(task)
    tasks.push(task)
  })
  // console.log("package")
  // console.log(package)
  // console.log(JSON.stringify(package))
  // return package
  console.log(JSON.stringify(tasks))
  return tasks
}
