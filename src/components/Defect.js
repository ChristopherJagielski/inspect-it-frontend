import React, { useState } from "react";
import Canvas from "./Canvas";
import jQueryStatic from "jquery";
import axios from "axios";

const Defect = props => {

  const defectURL = '/defects/'
  const img = props.image

  const [defectName, setNewDefectName] = useState('')
  const [isEnableMarking, setEnableMarking] = useState(false)

  const defect = {
    "defect_name": defectName,
    "part_instance": props.part_instance,
    "status": props.status,
    "defect_location": [],
    "operator": "Patryk"
  }

  function setNewCoordinates({x, y}) {
    
    defect.defect_location.push({x, y});
    console.log(defect)
    // save coords to db
  }

  function saveInspectionResults() {

    console.log("the defect is ", defect)

    // Needs a function to check if all fields are filled properly

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

      axios({
        method: "POST",
        url: defectURL,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': csrftoken
          },
        data: defect,
  })

}
    return <div>
      <div>
        <select onChange={(e) => {setNewDefectName(e.target.value); setEnableMarking(true)}}>
          
         <option value=""> Select defect from the list </option>
          <option value="File Marks"> File marks </option>
          <option value="Damage"> Damage </option>
          <option value="Low"> Low </option>
          <option value="Dent"> Dent </option>
          <option value="Ecoat texture"> Ecoat Texture </option>
          <option value="Missing Ecoat"> Missing Ecoat </option>
          <option value="High Spot"> High spot </option>
          <option value="Dag Line"> Dag Line </option>
          <option value="Striation"> Striation </option>
          <option value="Ripple"> Ripple </option>
          <option value="Distortion"> Distortion </option>
          <option value="Poor Edge"> Poor Edge </option>
        </select>
        
        </div>
        
          <Canvas
            image={img}
            setcoordinates={setNewCoordinates}
            enableMarking={isEnableMarking}
            />
          <button onClick={saveInspectionResults}>+</button>
            </div>
          

        
}

export default Defect
