// import React from 'react';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import TvIcon from '@mui/icons-material/Tv';
import { Slider } from '@mui/material';
import Stack from '@mui/material/Stack';

function HandleClick(e, client) {
    console.log("clicked");
  
    // console.log(e.target.id);
    // console.log(e);
    //console.log(client);
  
    switch(e) {
      case 'volumeup':
        client.publish("denonavr/volume", "up");
      break;
      case 'volumedown':
        client.publish("denonavr/volume", "down");
      break;
      case 'mute':
        client.publish("denonavr/volume", "mute");
      break;
      case 'remoteup':
        client.publish("denonavr/remote", "up");
      break;
      case 'remotedown':
        client.publish("denonavr/remote", "down");
      break;
      case 'remoteok':
        client.publish("denonavr/remote", "ok");
      break;
      default:
    }
}

export default function DenonAVRDevice(props) {
  const theme = useTheme();
  const topic = "denonavr/currentvolume";

  const [updatingSlider, setUpdatingSlider] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(5);

  const handleSliderChange = (event, newValue) => {
      setCurrentVolume(newValue);
  };

  const handleSliderCommit = (event, newValue) => {
    setUpdatingSlider(true);
    props.mqttclient.publish("denonavr/volume", newValue + '');
    setCurrentVolume(newValue);
    setUpdatingSlider(false);

    console.log("Event: " + event)

    console.log(newValue);
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log('checking volume')

    if (updatingSlider) {
      return
    }

    props.mqttclient.subscribe(topic, (err) => {
      if (err) {
        console.log(err);
      }
    });

    props.mqttclient.on("message", (topic, message) => {
      // message is Buffer
      console.log(topic);
      console.log(message.toString());
      if (currentVolume != message.toString()) {
        console.log("updating volume slider")
        setCurrentVolume(message.toString())

      }

    });
  }, []);

  return (
    <Card sx={{ display: 'flex' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Home Theater
        </Typography>
        <Typography sx={{ display: 'flex', alignItems: 'right', pl: 1, pb: 1 }} variant="body2">
            
          <IconButton aria-label="volumedown" id="volumedown" onClick={(e) => HandleClick("volumedown", props.mqttclient)}>
            <VolumeDownIcon id="volumedown" />
            {/* {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />} */}
          </IconButton>
          <Slider 
              aria-label="Small" 
              value={currentVolume}
              onChange={handleSliderChange} 

              onChangeCommitted={handleSliderCommit} 
              valueLabelDisplay="auto" 
              min={0}
              max={75}
              display='flex' 
              step={0.5}
              // sx={{
              //   color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
              //   height: 4,
              //   '& .MuiSlider-thumb': {
              //     width: 8,
              //     height: 8,
              //     transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              //     '&:before': {
              //       boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              //     },
              //     '&:hover, &.Mui-focusVisible': {
              //       boxShadow: `0px 0px 0px 8px ${
              //         theme.palette.mode === 'dark'
              //           ? 'rgb(255 255 255 / 16%)'
              //           : 'rgb(0 0 0 / 16%)'
              //       }`,
              //     },
              //     '&.Mui-active': {
              //       width: 20,
              //       height: 20,
              //     },
              //   },
              //   '& .MuiSlider-rail': {
              //     opacity: 0.28,
              //   },
              // }}
          />
          <IconButton aria-label="volumeup" id="volumeup" onClick={(e) => HandleClick("volumeup", props.mqttclient)}>
            <VolumeUpIcon id="volumeup"/>
          </IconButton>
          <IconButton aria-label="mute" id="mute" onClick={((e) => HandleClick("mute", props.mqttclient))}>
              <VolumeOffIcon sx={{}} />
            {/* {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />} */}
          </IconButton>
          </Typography>
          </CardContent>
    </Card>

    // <Card sx={{ display: 'flex' }}>
    //   {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}> */}
    //   <Box sx={{ display: 'flex', flexDirection: 'row' }}>
    //   <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
    //     <CardContent sx={{ flex: '1 0 auto' }}>
        
    //       <Typography component="div" variant="h5">
    //         Home Theater
    //       </Typography>

          
    //       {/* <Typography variant="subtitle1" color="text.secondary" component="div">
    //         Mac Miller
    //       </Typography> */}
          
    //     </CardContent>
    //     </Box>
    //     {/* <Box sx={{ display: 'flex', alignItems: 'right', pl: 1, pb: 1 }}> */}
    //     {/* <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center"> */}
    //         {/* <VolumeDownIcon /> */}
    //         {/* <Slider aria-label="Volume" value={value} onChange={handleChange} /> */}
    //         {/* <Slider 
    //           aria-label="Small" 
    //           value={currentVolume}
    //           onChange={handleSliderChange} 
    //           valueLabelDisplay="auto" 
    //           min={0}
    //           max={75} />

    //         <VolumeUpIcon /> */}
    //       {/* </Stack> */}
    //       {/* </Box> */}
    //     <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          
    //       <IconButton aria-label="volumedown" id="volumedown" onClick={(e) => HandleClick("volumedown", props.mqttclient)}>
    //         <VolumeDownIcon id="volumedown" />
    //         {/* {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />} */}
    //       </IconButton>
    //       <Slider 
    //           aria-label="Small" 
    //           value={currentVolume}
    //           onChange={handleSliderChange} 
    //           valueLabelDisplay="auto" 
    //           min={0}
    //           max={75} />
    //       <IconButton aria-label="volumeup" id="volumeup" onClick={(e) => HandleClick("volumeup", props.mqttclient)}>
    //         <VolumeUpIcon id="volumeup"/>
    //       </IconButton>
    //       <IconButton aria-label="mute" id="mute" onClick={((e) => HandleClick("mute", props.mqttclient))}>
    //           <VolumeOffIcon sx={{}} />
    //         {/* {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />} */}
    //       </IconButton>

    //     </Box>
        
    //   </Box>
    // </Card>
  );
}

// function NavButtons(props) {

//     return (
//         <div>
//             <button id={"volumeup"} onClick={((e) => HandleClick(e, props.mqttclient))}>Volume UP</button>
//             <button id={"volumedown"} onClick={((e) => HandleClick(e, props.mqttclient))}>Volume Down</button>
//             <button id={"mute"} onClick={props.HandleClic}>Mute</button>

//             <button id={"remoteup"} onClick={props.HandleClic}>Remote UP</button>
//             <button id={"remotedown"} onClick={props.HandleClic}>Remote Down</button>
//             <button id={"remoteok"} onClick={props.HandleClic}>Remote OK</button>
//         </div>
//     )
// }

// export default function TvDevice(props) {

//      return (
//          <div>
//             <NavButtons mqttclient={props.mqttclient}/>
//        </div>
//     )
// }