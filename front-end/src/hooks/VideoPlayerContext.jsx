import React, { useState, createContext } from 'react';

export const VideoPlayerContext = createContext({})

export const VideoPlayerProvider = (props) => {
  
  const [videoDuration, setVideoDuration] = useState({
    duration: 1000,
    startTime: 70,
    endTime: 100,
  });


  return(

    <VideoPlayerContext.Provider value={[videoDuration, setVideoDuration]}>
      {props.children}
    </VideoPlayerContext.Provider>
  );
}