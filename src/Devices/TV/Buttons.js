import React from 'react';

export default function NavButtons(props) {

    //  const HandleClick = (key) =>{
    //      setCounter(state => ({...state, [key]: state[key] + 1}));
    //  }

     return (
         <div>
            <button id={"volumeup"} onClick={((e) => props.HandleClick(e))}>Volume UP</button>
            <button id={"volumedown"} onClick={props.HandleClic}>Volume Down</button>
            <button id={"mute"} onClick={props.HandleClic}>Mute</button>

            <button id={"remoteup"} onClick={props.HandleClic}>Remote UP</button>
            <button id={"remotedown"} onClick={props.HandleClic}>Remote Down</button>
            <button id={"remoteok"} onClick={props.HandleClic}>Remote OK</button>
       </div>
    )
}