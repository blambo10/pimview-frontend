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
 
  document.body.style.backgroundColor = "grey"
  return (
    <div className="App">
        <h1>Pimview</h1>
        <TvDevice mqttclient={client} />
    </div>
  );
}
export default App;