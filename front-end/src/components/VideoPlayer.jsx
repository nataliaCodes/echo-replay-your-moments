import { useContext } from 'react';
import YouTube from 'react-youtube';
import useApplicationData from '../hooks/useApplicationData';
import { VideoPlayerContext } from '../hooks/VideoPlayerContext'

export default function YTplayer(props) {

  
  const [ videoDuration, setVideoDuration] = useContext(VideoPlayerContext)
  
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
    player.seekTo(videoDuration.startTime)
    player.playVideo(); 
  }

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
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
