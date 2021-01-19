import { useContext } from 'react';
import YouTube from 'react-youtube';
import useApplicationData from '../hooks/useApplicationData';
import { VideoPlayerContext } from '../hooks/VideoPlayerContext'

export default function YTplayer(props) {

  const { state, setState } = useApplicationData();
  
  const [ videoDuration, setVideoDuration, startTime, setStartTime, endTime, setEndTime ] = useContext(VideoPlayerContext)
  
  const videoOnReady=(event) =>{
    // access to player in all event handlers via event.target
    const player = event.target;
    // player.seekTo(60);
    player.setLoop(true)
    console.log("Video Duration",player.getDuration())
    let vd = player.getDuration()
    setVideoDuration({...videoDuration, duration: vd})
  }
  const videoOnPlay=(event) =>{
    // access to player in all event handlers via event.target
    const player = event.target;
  }

  const videoOnEnd=(event) =>{
    // access to player in all event handlers via event.target
    const player = event.target;
    console.log("Time",player)
    player.seekTo(state.startTime)
    player.playVideo(); 
    console.log("onEND start", startTime, "end", endTime)
  }

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      loop: 1,
      start: videoDuration.startTime,
      end: videoDuration.endTime

    },
  };
  
  return ( 
    <YouTube 
    videoId={props.videoId} 
    opts={opts} 
    onReady={videoOnReady}
    onPlay={videoOnPlay}
    onEnd={videoOnEnd}
    />
  );
}
