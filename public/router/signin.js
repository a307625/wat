$(document).ready(function(){
  MODULE.authMethod(function(err, data) {
    if (!err) {
      const {done} = data
      if(done) {
        $(".contain_signout").show()
        $(".contain_signin").hide()
        $(".contain_signup").hide()
      }else {
        $(".contain_signout").hide()
        $(".contain_signin").show()
        $(".contain_signup").hide()
      }
    }else {
      console.log(data)
      alert("網站出現問題")
    }
  })
})

$(document).ready(function(){
  $("#signOutButton").click(function(){
    $(".contain_signout").hide()
    $(".contain_signin").show()
    $(".contain_signup").hide()
    localStorage.removeItem("auth")
  })
})

$(document).ready(function(){
  $("#registerButton").click(function(){
    $("#error_hint_signup").hide()
    $("#error_hint_signin").hide()
    $(".contain_signin").hide()
    $(".contain_signup").show()
  })
})

$(document).ready(function(){
  $(".signUpPage").submit(function(event){
    event.preventDefault()// Stop form from submitting normally
    $("#error_hint_signup").hide()
    const nickname = $("#signUp_name").val()
    const email = $("#signUp_email").val()
    const password1 = $("#signUp_password1").val()
    const password2 = $("#signUp_password2").val()
    if(password1 == password2){
      $.post("http://localhost:3000/v1/signuperic",{
        nickname,
        email,
        password1,
        password2
      })
      .done(function(response,status){
        const {register, message} = response
        if(register){
          alert(message)
          $("#signIn_email, #signIn_password").val("")
          $("#signUp_name, #signUp_email, #signUp_password1, #signUp_password2").val("")
          $(".contain_signin").show();
          $(".contain_signup").hide();
        }else {
          $("#error_hint_signup").show();
          document.getElementById("error_hint_signup").innerHTML = message
        }
      })
      .fail(function(response,status) {
        console.log(response)
        alert("網站出現問題")
      })
    }else {
        $("#error_hint_signup").show();
        document.getElementById("error_hint_signup").innerHTML="密碼錯誤,請重新輸入密碼"
    }
  })
})

$(document).ready(function(){
  $(".signInPage").submit(function(event){
    event.preventDefault()// Stop form from submitting normally
    $("#error_hint_signin").hide()
    const email = $("#signIn_email").val()
    const password = $("#signIn_password").val()
    $.post("http://localhost:3000/v1/signineric",{
      email,
      password
    })
    .done(function(response, status){
      const {login, message} = response
      if(login){
        $("#signIn_email, #signIn_password").val("")
        $("#signUp_name, #signUp_email, #signUp_password1, #signUp_password2").val("")
        const {auth, id} = response
        localStorage.setItem("auth",auth)
        localStorage.setItem("id",id)
        window.location.replace("userPage.html")
      }else {
        $("#error_hint_signin").show();
        document.getElementById("error_hint_signin").innerHTML= message
      }
    })
    .fail(function(response, status){
      console.log(response)
      alert("網站出現問題")
    })
  })
})
