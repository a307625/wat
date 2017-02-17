$(document).ready(function(){
  const search = location.search
  console.log(search)
  const token = search.split("token=")[1]
  console.log(token)
  $.get({
    url:'http://localhost:3000/v1/signuperic/verification',
    data: {
      token
    },
    dataType: 'json'
  })
  .done(function(response,status){
    console.log("OK")
    document.getElementById("authButton").value = "認證成功,按此完成認證"
  })
  .fail(function(response,status){
    console.log("FAIL")
    document.getElementById("authButton").value = "認證失敗"
  })
})

function index() {
  window.location.replace("index.html")
}
