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
          <span id='x' onclick = "del(this)">X</span>
        </div>
        <div id ="optionTitle">
          &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<b id="toolname">H2</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        </div>
        <div id ="option">
          TIMES:
          <input type="number" name="toolnameH2runs" id = "runs" value="" onblur="int(this)" required>
        </div>
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
          <span id='x' onclick = "del(this)">X</span>
        </div>
        <div id ="optionTitle">
          &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<b id="toolname">CDM</b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        </div>
        <div id ="option">
          TIMES:
          <input type="number" name="toolnameCDMruns" id = "runs" value="" onblur="int(this)" required>
        </div>
        <div id ="option">
          MODE:&nbsp
          <select name = "mode" id = "mode" required>
            <option value = ""></option>
            <option value = "0" id = "mode0">MODE0 SR+SW/RR512+RW512/RR4+RW4</option>
            <option value = "1" id = "mode1">MODE1 SR+SW</option>
            <option value = "2" id = "mode2">MODE2 RR512+RW512</option>
            <option value = "3" id = "mode3">MODE3 RR4+RW4</option>
          </select>
        </div>
        <div id ="option">
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
        </div>
        <p></p>
      <div>`

    const rightDoc =  parent.frames["rightFrame"].document
    const element1 = $(rightDoc).find("#form2-div1")
    element1.append(Text)
  }
}
