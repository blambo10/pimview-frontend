// import React from 'react';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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

function HandleClick(e, client) {
    console.log("clicked");
  
    // console.log(e.target.id);
    // console.log(e);
    //console.log(client);
  
    switch(e) {
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

export default function TvDevice(props) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="volumedown" id="volumedown" onClick={(e) => HandleClick("volumedown", props.mqttclient)}>
            <VolumeDownIcon id="volumedown" sx={{ height: 38, width: 38 }} />
            {/* {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />} */}
          </IconButton>
          <IconButton aria-label="volumeup" id="volumeup" onClick={(e) => HandleClick("volumeup", props.mqttclient)}>
            <VolumeUpIcon id="volumeup" sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="mute" id="mute" onClick={((e) => HandleClick("mute", props.mqttclient))}>
              <VolumeOffIcon sx={{ height: 38, width: 38 }} />
            {/* {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />} */}
          </IconButton>
        </Box>
      </Box>
    </Card>
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