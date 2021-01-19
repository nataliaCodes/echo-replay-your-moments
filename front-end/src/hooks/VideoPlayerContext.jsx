import React, { useState, createContext } from 'react';

export const VideoPlayerContext = createContext({})

export const VideoPlayerProvider = (props) => {
  
  const [videoDuration, setVideoDuration] = useState({
    duration: 0,
    startTime: 70,
    endTime: 100,
  });
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);


  const start = (x)=> {
    setStartTime(x)
  }

  const end = (x)=> {
    setEndTime(x)
  }

  return(

    <VideoPlayerContext.Provider value={[videoDuration, setVideoDuration, startTime, setStartTime, endTime, setEndTime, start, end]}>
      {props.children}
    </VideoPlayerContext.Provider>
  );
}