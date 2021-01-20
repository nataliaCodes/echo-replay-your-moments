import { useContext } from 'react';
import YouTube from 'react-youtube';
import useApplicationData from '../hooks/useApplicationData';

export default function YTplayer(props) {

  // const { state } = useApplicationData();
  
  const videoOnReady=(event) =>{
    // access to player in all event handlers via event.target
    const player = event.target;
    
      // console.log("VP state", state)

    player.setLoop(true)
    console.log("Video Duration",player.getDuration())
    let vd = player.getDuration()
    props.setVideoInfo(prev=>({...prev, duration: vd}))
  }
  const videoOnPlay=(event) =>{
    // access to player in all event handlers via event.target
    const player = event.target;
  }

  const videoOnEnd=(event) =>{
    // access to player in all event handlers via event.target
    const player = event.target;
    player.seekTo(props.videoInfo.startTime)
    player.playVideo(); 
  }

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: props.videoInfo.startTime,
      end: props.videoInfo.endTime

    },
  };
  
  return ( 
    <YouTube 
      videoId={props.videoInfo.selectedVideoID} 
      opts={opts} 
      onReady={videoOnReady}
      onPlay={videoOnPlay}
      onEnd={videoOnEnd}
    />
  );
}
