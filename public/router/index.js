$(document).ready(function(){
  MODULE.authMethod(function(err,data){
    if(!err) {
      const {done} = data
      if(done) {
        const Page = document.getElementById("iframePage")
        Page.src = "html/userPage.html"
      }else {
        const Page = document.getElementById("iframePage")
        Page.src = "html/home.html"
      }
    }else {
      console.log(data)
      alert("網站出現問題")
    }
  })
})



function home(){
  MODULE.authMethod(function(err, data) {
    if (!err) {
      const {done} = data
      if(done) {
        const Page = document.getElementById("iframePage")
        Page.src = "html/userPage.html"
      }else {
        const Page = document.getElementById("iframePage")
        Page.src = "html/home.html"
      }
    } else {
      console.log(data)
      alert("網站出現問題")
    }

  })
}

function signin(){
  const Page = document.getElementById("iframePage")
  Page.src = "html/signin.html"
}
