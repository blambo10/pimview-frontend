import React, { useState } from 'react';
const Buttons = () => {
    const[setCounter]= useState({
         good: 0,
         neutral: 0,
         bad: 0
    });

     const HandleClick = (key) =>{
         setCounter(state => ({...state, [key]: state[key] + 1}));
     }

     return (
         <div>
             <button className={"GoodBtn"} onClick={HandleClick('good')}>ON</button>
             <button className={"NeutralBtn"} onClick={HandleClick('neutral')}>OFF</button>
       </div>
    )
}

export default Buttons;