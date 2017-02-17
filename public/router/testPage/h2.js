// $("#form2").submit(function(event){
//   event.preventDefault()
// })

function del(self){
  $(self).parents('.lineDiv').remove()
}

function int(runs){
  const num = $(runs).val()
  if( num && ( num < 1 ) ){
    $(runs).val("1")
  }
}

function sendForm(){
  const leftDoc =  parent.frames["leftFrame"].document
  const FW = $(leftDoc).find("#FW").val()
  const form = $("#form2").serializeArray()
  // console.log(form)
  // console.log(FW)
  const tasks = parseStr(form, FW)
  const user = localStorage.getItem("id")
  $.post("http://localhost:3000/v1/tools",{
    tasks,
    user
  })
  .done(function(response, status){
    // alert("測試表單已送出")
  })
  .fail(function(response, status){
    alert("發生錯誤")
  })




}
