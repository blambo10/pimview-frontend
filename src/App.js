// import React, { useState, Fragment } from "react";
import "./App.css";
// import "./devices/tv/tv"
// import Buttons from "./devices/tv/tv";

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
 
// client.subscribe("publishtopic");
// client.subscribe("topic/test");

console.log("Client subscribed ");
 
const HandleClick = () =>{
  client.publish("topic/test", "helloworld");
}

function App() {
  var note;
  client.on("message", function (topic, message) {
    note = message.toString();
    // Updates React state with message
    // setMsg(note);
    console.log(note);
    client.end();
  });
 
  return (
    <div className="App">

      <header className="App-header">
        <h1>Pimview Frontend</h1>
        <button className={"GoodBtn"} onClick={HandleClick()}>Volume UP</button>
        {/* <button className={"GoodBtn"} onClick={HandleClick()}>Volume Down</button> */}
      </header>
    </div>
  );
}
export default App;