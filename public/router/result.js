
MODULE.authMethod(function(err, data){
  if(!err){
    const {done} = data
    if(done){
      const info = window.location.search
      const tester = info.split("tester=")[1].split("&_id=")[0]
      const _id = info.split("tester=")[1].split("&_id=")[1].split("&toolname=")[0]
      const toolname = info.split("tester=")[1].split("&_id=")[1].split("&toolname=")[1]
      $.get({
        url:'http://localhost:3000/v1/data/searchResult',
        data: {
          tester,
          toolname,
          _id
        },
        dataType: 'json'
      })
      .done(function(result, state){
        const {user} = result
        const {fw, toolname, createddate, data, status} = result.dataPackage
        const day = createddate.split("T")[0]
        const time = createddate.split("T")[1].split(".")[0]
        $("#tester").text(user)
        $("#fw").text(fw)
        $("#tool").text(toolname)
        $("#time").text(day+" "+time)
        $("#status").text(status)
        if(toolname == "CDM"){
          if(data.SR && data.SW){
            const td_a = $("<td>").text("Seq Read")
            const td_b = $("<td>").text((data.SR).toFixed(3))
            const tr1 = $("<tr>").append(td_a,td_b)
            const td_c = $("<td>").text("Seq Write")
            const td_d = $("<td>").text((data.SW).toFixed(3))
            const tr2 = $("<tr>").append(td_c,td_d)
            $(".T2").append(tr1, tr2)
          }
          if(data.RR4 && data.RW4){
            const td_e = $("<td>").text("R4K Read")
            const td_f = $("<td>").text((data.RR4).toFixed(3))
            const tr3 = $("<tr>").append(td_e,td_f)
            const td_g = $("<td>").text("R4K Write")
            const td_h = $("<td>").text((data.RW4).toFixed(3))
            const tr4 = $("<tr>").append(td_g,td_h)
            $(".T2").append(tr3, tr4)
          }
          if(data.RR512 && data.RW512){
            const td_i = $("<td>").text("R512K Read")
            const td_j = $("<td>").text((data.RR512).toFixed(3))
            const tr5 = $("<tr>").append(td_i,td_j)
            const td_k = $("<td>").text("R512K Write")
            const td_l = $("<td>").text((data.RW512).toFixed(3))
            const tr6 = $("<tr>").append(td_k,td_l)
            $(".T2").append(tr5, tr6)
          }
        }
        // const td1 = $("<td>").text("")
        // const tr = $("<tr>").append(td1,td2,td3,td4,td5)


      })
      .fail(function(result, state){
        console.log("get DB for date err")
        alert("網站出現問題")
      })
    }else {
      $("body").text("安安 請先登入喔")
    }
  }
  else{
    console.log(data)
    alert("網站出現問題")
  }
})
