import React, { useState, useEffect } from "react";
import axios from "axios";
import jQueryStatic from "jquery";
import Canvas from "./Canvas";


function Parts() {

    const partURL = '/parts/'
    const instanceURL = '/part_instances/'

    const [partFG, setPartFG] = useState(' ')
    const [partDescription, setPartDescription] = useState(' ')
    const [referenceImage, setNewReferenceImage] = useState(' ')
    const [serialNumber, setSerialNumber] = useState(' ')
    const [inspectionStage, setInspectionStage] = useState('Final inspection')
    const [inspectionStatus, setInspectionStatus] = useState('OK')
    


    useEffect(() => {
        getParts()
          } ,[partFG])
    
    function getParts() {

      axios({
          method: "GET",
          url: partURL,
          
      }).then((response)=>{
          const data = response.data
          const part = data.filter(i => i.FG_code == partFG);
          console.log(part);
          setNewReferenceImage(part[0].img_reference);
          setPartFG(part[0].FG_code);
          setPartDescription(part[0].description);

      }).catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
      })
    }

    function saveInspectionResults() {

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
            part_origin: partFG,
            serial_number: serialNumber,
            stage: inspectionStage,
            status: inspectionStatus,
            operator: "Gizmo"
      };

      console.log(inspectionResults);

        axios({
          method: "POST",
          url: instanceURL,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': csrftoken
            },
          body: JSON.stringify(inspectionResults),
        });
        setSerialNumber(" ");
    }

    const handleFGSubmit = (e) => {

      setPartFG(e.target.value);
    }
    
    return <div className="partImage">
      <label  htmlFor="FG_code-select">Part FG Code</label>
      <form >
      <select id="FG_code-select" onChange={handleFGSubmit}>
        <option value=" "> Select the FG Code</option>
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
      <h1>{partFG}</h1><br/>
      <h2>{partDescription}</h2>
      <div>
      <Canvas 
        image={referenceImage}
      />
        <form >
          <label>SERIAL NUMBER</label>
          <input type="text" onChange={(e) => {setSerialNumber(e.target.value)}}/>
          </form>
          <select onChange={(e) => {setInspectionStage(e.target.value)}}>
            <option value="Final Inspection"> Final inspection</option>
            <option value="Pre-paint Inspection"> Pre-paint Inspection</option>
            
          </select>
          <select onChange={(e) => {setInspectionStatus(e.target.value)}}>
          
            <option value="OK"> OK </option>
            <option value="Rework"> Rework </option>
            <option value="Quarantine"> Quarantine </option>
            <option value="Scrap"> Scrap </option>
          </select>
          <button onClick={saveInspectionResults}>Save</button>
      </div>
      <div>{serialNumber}</div>
    </div>
  }
export default Parts
    