$(document).ready(function(){
  window.history.forward(1);
})

function test(){
  const Page = document.getElementById("iframeUserPage")
  Page.src = "testPage.html"
}

function record(){
  const Page = document.getElementById("iframeUserPage")
  Page.src = "recordPage.html"
}

function search(){
  const Page = document.getElementById("iframeUserPage")
  Page.src = "searchPage.html"
}
