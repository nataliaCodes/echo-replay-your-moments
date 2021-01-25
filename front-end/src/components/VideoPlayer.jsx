import { useState } from 'react';
import YouTube from 'react-youtube';
import Alert from 'react-bootstrap/Alert';


export default function YTplayer(props) {

  const { state, setState } = props;

  const [show, setShow] = useState(false);

  const videoOnReady=(event) =>{
    // access to player in all event handlers via event.target
    const player = event.target;
    player.playVideo()
    player.seekTo(props.videoInfo.startTime, true)
    
    player.setLoop(true)
    console.log("Video Duration",player.getDuration())
    let vd = player.getDuration()
    //set alert with duration is null
    if (vd <= 0) {
      setShow(true)
    };

    props.setVideoInfo(prev=>({...prev, duration: vd}))
    
  }

  const videoOnPlay=(event) =>{
    // access to player in all event handlers via event.target
    const player = event.target;
  }

  const videoOnEnd=(event) =>{
    // access to player in all event handlers via event.target
    const player = event.target;
    player.seekTo(props.videoInfo.startTime, true)
    //stops the autoplay
    if(props.videoInfo.loop === 0){
      player.pauseVideo()
    }
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: props.videoInfo.autoplay,
      // autoplay: 1,
      loop: props.videoInfo.loop,
      start: props.videoInfo.startTime,
      end: props.videoInfo.endTime

    },
  };

  if (show) {
    return (
      <div>
        <Alert variant="warning" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Video not Supported</Alert.Heading>
          <p>
            Sorry, Moment actions will not work, please select a different video.
          </p>
        </Alert>
        <YouTube 
          videoId={props.videoInfo.selectedVideoID} 
          opts={opts} 
          onReady={videoOnReady}
          onPlay={videoOnPlay}
          onEnd={videoOnEnd}
        />
      </div>
    );
  }

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
