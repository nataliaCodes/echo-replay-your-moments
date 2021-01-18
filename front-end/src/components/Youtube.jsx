import React from 'react';
import YouTube from 'react-youtube';
 
export default function YTplayer(props) {
  
  const videoOnReady=(event) =>{
    // access to player in all event handlers via event.target
    const player = event.target;
    // player.seekTo(60);
    player.setLoop(true)
    console.log("Video Duration",player.getDuration())
  }
  const videoOnPlay=(event) =>{
    // access to player in all event handlers via event.target
    const player = event.target;
  //   console.log("Current Time",player.getCurrentTime())
  }
  const videoOnEnd=(event) =>{
    // access to player in all event handlers via event.target
    const player = event.target;
    console.log("Time",player)
    player.seekTo(props.startTime)
    player.playVideo(); 

  }
    // let startSeconds = props.startTime
    // let endSeconds = props.endTime

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        loop: props.loop,
        start: props.startTime,
        end: props.endTime

      },
    };
    
    return ( 
      <YouTube 
      videoId={'2T6YMokSM68'} 
      opts={opts} 
      onReady={videoOnReady}
      onPlay={videoOnPlay}
      onEnd={videoOnEnd}
      />
    );
  }
