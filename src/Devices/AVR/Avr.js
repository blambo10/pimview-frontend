// import React from 'react';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
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
import MediaControl from '../../components/MediaControl/MediaControl'

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

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

  const [currentVolume, setCurrentVolume] = useState(5);

  const handleSliderChange = (event, newValue) => {
    setCurrentVolume(newValue);
  };

  const handleSliderCommit = (event, newValue) => {
    props.mqttclient.publish("denonavr/volume", newValue + '');
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log('checking volume')

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
    <MediaControl 
      Title={"Home Theatre"} 
      handleSliderCommit={handleSliderCommit} 
      handleSliderChange={handleSliderChange}
      volume={currentVolume}>
      

    </MediaControl>
  );
}
