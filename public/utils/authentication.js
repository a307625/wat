const MODULE=(function(){
    const my={}
    my.authMethod = function(cb){
      const authPacket = {}
      const auth = localStorage.getItem("auth")
      $.post("http://localhost:3000/v1/signineric/authentication",{
        auth
      })
      .done(function(data,status){
        cb(null, data)
        console.log(data)
      })
      .fail(function(data,status){
        cb(true, data)
      })
    }
    return my
}())
