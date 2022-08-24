import React, { useState } from 'react';
import Analyse from './components/Analysis';
import Parts from './components/Part';

function App() {

  const [toggleMode, setNewToggleMode] = useState(false);
  const [mode, setMode] = useState("ANALYSE")



  const inspectionScreen = (
    <header className="App-header">
      <h2>Inspect-It</h2>
      <Parts />
    </header>
  )

  const analyseScreen = (<div>
    <Analyse />
  </div>)

  return (<div className="App">

    <select onChange={() => { setNewToggleMode(!toggleMode) }}>
      <option value="Inspect">INSPECT</option>
      <option value="Analyse">ANALYSE</option>
    </select>

    <div>{toggleMode ? analyseScreen : inspectionScreen}</div>
  </div>);
}
export default App;
