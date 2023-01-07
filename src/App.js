import "./App.css";
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
 
const HandleClick = (e) => {
  console.log("clicked");

  console.log(e.target.id);

  switch(e.target.id) {
    case 'volumeup':
      client.publish("webos/volume", "up");
    break;
    case 'volumedown':
      client.publish("webos/volume", "down");
    break;
    case 'mute':
      client.publish("webos/volume", "mute");
    break;
    case 'remoteup':
      client.publish("webos/remote", "up");
    break;
    case 'remotedown':
      client.publish("webos/remote", "down");
    break;
    case 'remoteok':
      client.publish("webos/remote", "ok");
    break;
    default:
  }
}

function App() {
 
  return (
    <div className="App">

      <header className="App-header">
        <h1>Pimview Frontend</h1>
        <button id={"volumeup"} onClick={((e) => HandleClick(e))}>Volume UP</button>
        <button id={"volumedown"} onClick={HandleClick}>Volume Down</button>
        <button id={"mute"} onClick={HandleClick}>Mute</button>

        <button id={"remoteup"} onClick={HandleClick}>Remote UP</button>
        <button id={"remotedown"} onClick={HandleClick}>Remote Down</button>
        <button id={"remoteok"} onClick={HandleClick}>Remote OK</button>
      </header>
    </div>
  );
}
export default App;