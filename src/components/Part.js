import React, { useState, useEffect } from "react";
import axios from "axios";
import Defect from './Defect';
import jQueryStatic from "jquery";



function Parts() {

  const partURL = '/parts/'
  const instanceURL = '/part-instances/'
  const defaultImage = 'http://127.0.0.1:8000/media/images/default.png'
  let serialNumber = ''



  const [part, setNewPart] = useState('')
  const [partFG, setPartFG] = useState('')
  const [partDescription, setPartDescription] = useState('')
  const [referenceImage, setNewReferenceImage] = useState(defaultImage)
  const [partInstance, setNewPartInstance] = useState(null)
  // const [serialNumber, setSerialNumber] = useState(' ')
  const [inspectionStage, setInspectionStage] = useState('Final inspection')
  const [inspectionStatus, setInspectionStatus] = useState('OK')
  const [isFgCode, setFgCode] = useState(false)
  const [isSerial, setIsSerial] = useState(false)
  const [isOK, setIsOK] = useState(true)

  useEffect(() => {
    getParts()
    // getPartInstances()
  }, [partFG])

  function getParts() {

    console.log('get parts')

    axios({
      method: "GET",
      url: partURL,

    }).then((response) => {
      const data = response.data
      const retrievedPart = data.filter(i => i.FG_code == partFG);
      setNewReferenceImage(retrievedPart[0].img_reference);
      setPartFG(retrievedPart[0].FG_code);
      setPartDescription(retrievedPart[0].description);
      setNewPart(retrievedPart[0].id)

    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })
  }

  console.log("image", referenceImage)

  function addPartInstance() {
    function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
          var cookie = jQueryStatic.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      console.log(cookieValue)

      return cookieValue;
    }

    const csrftoken = getCookie('csrftoken');

    const inspectionResults = {
      "part_origin": part,
      "serial_number": serialNumber,
      "stage": inspectionStage,

    };

    console.log(inspectionResults)

    axios({
      method: "POST",
      url: instanceURL,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFTOKEN': csrftoken
      },
      data: inspectionResults,
    }).then((response) => {
      setNewPartInstance(response.data.id);
      setInspectionStage(response.data.stage);
      setInspectionStatus(response.data.status);
    })
    return false
  }

  const noStatusDisplay = <div></div>

  const statusDisplay = <div>
    <select onChange={(e) => { setInspectionStatus(e.target.value); setIsOK(false); addPartInstance(); }}>
      <option value="OK"> OK </option>
      <option value="Rework"> Rework </option>
      <option value="Quarantine"> Quarantine </option>
      <option value="Scrap"> Scrap </option>
    </select>
    <button onClick={() => {addPartInstance; serialNumber='';}}>+</button>
  </div>

  const noFgCodeDisplay = <div></div>

  const fgCodeDisplay = <div>

    <select onChange={(e) => { setInspectionStage(e.target.value) }}>
      <option value="Final Inspection"> Final inspection</option>
      <option value="Pre-paint Inspection"> Pre-paint Inspection</option>
    </select>

    <form >
      <label>SERIAL NUMBER</label>
      <input type="text" defaultValue={''} onChange={(e) => { serialNumber = e.target.value; setIsSerial(true) }} />
    </form>

    <div>
      {isSerial ? statusDisplay : noStatusDisplay}
    </div>
  </div>

  const noDefectMarkUp = <div></div>

  const defectMarkUp = <Defect
    origin={part}
    originFG={partFG}
    originDescription={partDescription}
    image={referenceImage}
    part_instance={partInstance}
    serialNumber={serialNumber}
    stage={inspectionStage}
    status={inspectionStatus}
  />

  const inspectScreen = (
    <div className="partImage">
      <label htmlFor="FG_code-select">Part FG Code</label>
      <form >
        <select id="FG_code-select" onChange={(e) => { setPartFG(e.target.value); setFgCode(true) }}>
          <option value=" "> Select Part </option>
          <option value="FG1986"> FG1986</option>
          <option value="FG1989"> FG1989</option>
          <option value="FG2275"> FG2275</option>
          <option value="FG2279"> FG2279</option>
          <option value="FG2165"> FG2165</option>
          <option value="FG2166"> FG2166</option>
          <option value="FG2337"> FG2337</option>
          <option value="FG2340"> FG2340</option>
        </select>
      </form>
      <h1>{partFG}</h1><br />
      <h2>{partDescription}</h2>
      <div>{isFgCode ? fgCodeDisplay : noFgCodeDisplay}</div>
    </div>


  )
  console.log("isOK", isOK)

  return (<div>
    <div>{inspectScreen}</div>
    <div>{isOK ? noDefectMarkUp : defectMarkUp}</div>

  </div>)
}
export default Parts

