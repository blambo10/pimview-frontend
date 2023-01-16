import "./App.css";
import TvDevice from './Devices/TV/Tv.js';
var mqtt = require("mqtt");

const mqttAddress = "localhost";
const mqttPort = "15675"
var options = {
  protocol: "ws",
  // username: "xxxxxxxxx",
  // password: "xxxxxxxx",
  keepalive: 20,
  // clientId uniquely identifies client
  // choose any string you wish
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
};
var client = mqtt.connect("mqtt://" + mqttAddress + ":" + mqttPort + "/ws", options);
 
function App() {
 
  return (
    <div className="App">

      <header className="App-header">
        <h1>Pimview Frontend</h1>
        <TvDevice mqttclient={client} />
        {/* <button id={"volumeup"} onClick={((e) => HandleClick(e))}>Volume UP</button>
        <button id={"volumedown"} onClick={HandleClick}>Volume Down</button>
        <button id={"mute"} onClick={HandleClick}>Mute</button>

        <button id={"remoteup"} onClick={HandleClick}>Remote UP</button>
        <button id={"remotedown"} onClick={HandleClick}>Remote Down</button>
        <button id={"remoteok"} onClick={HandleClick}>Remote OK</button> */}
      </header>
    </div>
  );
}
export default App;