// $(document).ready(function(){
//   $("#testForm").submit(function(){
//     const toolname = $('select[name= "toolname"]').val()
//     const mode = $('select[name = "mode"]').val()
//     const size = $('select[name = "size"]').val()
//     const runs = $("#runs").val()
//     const fw = $("#fw").val()
//     const packet = {}
//     packet.tasks =
//   })
//
// })



$("#form1").submit(function(event){
  event.preventDefault()
})


function H2(){
  const FW = document.getElementById("FW").value
  if(FW){
    // const span = Object.assign(document.createElement("span"),{
    //   id: 'x'
    // })
    // const xText = document.createTextNode("X")
    // span.appendChild(xText)
    // const xDiv = Object.assign(document.createElement("div"),{
    //   id: 'del',
    //   name:'0'
    // })
    // xDiv.appendChild(span)
    // const H2Text = document.createTextNode("H2")
    // const p = document.createElement("p")
    // const lineDiv = Object.assign(document.createElement("div"),{
    //   className: 'lineDiv',
    //   name: '0'
    // })
    // lineDiv.appendChild(xDiv)
    // lineDiv.innerHTML += ' '
    // lineDiv.innerHTML += '&nbsp&nbsp&nbsp&nbsp'
    // lineDiv.appendChild(H2Text)
    // lineDiv.appendChild(p)
    //
    //
    // const rightDoc =  parent.frames["rightFrame"].document
    // const element = rightDoc.getElementById("form2-div1")
    // element.appendChild(lineDiv)

    const Text = `
      <div class='lineDiv'>
        <div name='0' id='del'>
          <span id='x'>X</span>
        </div>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbspH2
        TIMES:
          <input type="number" id = "runsCDM" value="" required>
        <p></p>
      <div>`

    const rightDoc =  parent.frames["rightFrame"].document
    const element1 = $(rightDoc).find("#form2-div1")
    element1.append(Text)
  }
}



function CDM(){
  const FW = document.getElementById("FW").value
  if(FW){
    const Text = `
      <div class='lineDiv'>
        <div name='0' id='del'>
          <span id='x'>X</span>
        </div>
        &nbsp&nbspCDM
        MODE:&nbsp
        <select name = "mode" id = "mode" required>
          <option value = ""></option>
          <option value = "0" id = "mode0">MODE0 SR+SW/RR512+RW512/RR4+RW4</option>
          <option value = "1" id = "mode1">MODE1 SR+SW</option>
          <option value = "2" id = "mode2">MODE2 RR512+RW512</option>
          <option value = "3" id = "mode3">MODE3 RR4+RW4</option>
        </select>
        SIZE:
        <select name = "size" id = "size" required>
          <option value = ""></option>
          <option value = "50" id = "size50">50K</option>
          <option value = "100" id = "size100">100K</option>
          <option value = "500" id = "size500">500K</option>
          <option value = "1000" id = "size1000">1000K</option>
          <option value = "2000" id = "size2000">2000K</option>
          <option value = "4000" id = "size4000">4000K</option>
        </select>
        TIMES:
          <input type="number" id = "runsCDM" value="" required>
            <p>FW VERSION:</p>
            <input type="text" id = "fw" required>
        <p></p>
      <div>`

    const rightDoc =  parent.frames["rightFrame"].document
    const element1 = $(rightDoc).find("#form2-div1")
    element1.append(Text)
  }
}
