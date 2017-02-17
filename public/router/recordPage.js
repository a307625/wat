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
    $("#allData").remove()
    data.dataPackage.forEach(function(arr){
      const myDate = arr.createddate
      const day = myDate.split("T")[0]
      const time = myDate.split("T")[1].split(".")[0]
      const td1 = $("<td>").text(arr.toolname)
      td1.attr("id", "tool")
      const td2 = $("<td>").text(arr.fw)
      td2.attr("id", "fw")
      const td3 = $("<td>").text(day+" "+time)
      td3.attr("id", "time")
      const td4 = $("<td>").text(arr.status)
      td4.attr("id", "result")
      const td5 = $("<td>").text("口")
      td5.attr("id", arr._id)
      const tr = $("<tr>").append(td1,td2,td3,td4,td5)
      tr.attr("id", "allData")
      $("#resultTable").append(tr)
    })


  })
  .fail(function(data, status){
    console.log("get DB for date err")
  })

}
