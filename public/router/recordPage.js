$(document).ready(function(){
  const user = localStorage.getItem("id")
  $.get({
    url:'http://localhost:3000/v1/data/searchUser',
    data: {
      user
    },
    dataType: 'json'
  })
  .done(function(data, status){
    const allDate = data.allDate
    const bar = document.getElementById("timebar")
    allDate.forEach((arr, index)=>{
    bar.options[index+1] = new Option(arr, arr)
    })
  })
  .fail(function(data, status){
    console.log("get DB for date err")
  })
})

function select(){
  const date = $("#timebar").val()
  const user = localStorage.getItem("id")
  $.get({
    url:'http://localhost:3000/v1/data/searchDate',
    data: {
      date,
      user
    },
    dataType: 'json'
  })
  .done(function(data, status){
    $(".allData").remove()
    console.log(data)
    data.dataPackage.forEach(function(arr){
      const myDate = arr.createddate
      const day = myDate.split("T")[0]
      const time = myDate.split("T")[1].split(".")[0]
      const _id = arr._id
      const toolname = arr.toolname
      const td1 = $("<td>").text(toolname)
      td1.attr("id", "tool")
      const td2 = $("<td>").text(arr.fw)
      td2.attr("id", "fw")
      const td3 = $("<td>").text(day+" "+time)
      td3.attr("id", "time")
      const td4 = $("<td>").text(arr.status)
      td4.attr("id", "result")
      const td5 = $("<td>").html(`<a  href='#' onClick=window.open('http://localhost:3000/html/result.html?tester=${user}&_id=${_id}&toolname=${toolname}','${_id}',config='height=500,width=220,resizable=no,location=no')>目</a>`)

      // td5.attr("id", arr._id)
      // td5.attr("href","http://www.w3school.com.cn/jquery")

      const tr = $("<tr>").append(td1,td2,td3,td4,td5)
      tr.attr("class", "allData")
      $("#resultTable").append(tr)
    })


  })
  .fail(function(data, status){
    console.log("get DB for date err")
  })

}
