import React from 'react';
// import './Buttons';

function HandleClick(e, client) {
    console.log("clicked");
  
    console.log(e.target.id);
    console.log(client);
  
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

function NavButtons(props) {

    return (
        <div>
        <button id={"volumeup"} onClick={((e) => HandleClick(e, props.mqttclient))}>Volume UP</button>
        <button id={"volumedown"} onClick={((e) => HandleClick(e, props.mqttclient))}>Volume Down</button>
        <button id={"mute"} onClick={props.HandleClic}>Mute</button>

        <button id={"remoteup"} onClick={props.HandleClic}>Remote UP</button>
        <button id={"remotedown"} onClick={props.HandleClic}>Remote Down</button>
        <button id={"remoteok"} onClick={props.HandleClic}>Remote OK</button>
       </div>   
    )
}

export default function TvDevice(props) {

    //  const HandleClick = (key) =>{
    //      setCounter(state => ({...state, [key]: state[key] + 1}));
    //  }

     return (
         <div>
            <NavButtons mqttclient={props.mqttclient}/>
       </div>
    )
}