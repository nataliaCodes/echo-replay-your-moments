import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import VideoPlayer from './VideoPlayer';
import MomentsList from './MomentsList';
import MomentBar from './MomentBar';
import NewMoment from './NewMoment';
import Save from './Save';
import AutoButton from './AutoButton';



export default function Moment(props) {

  const { state, setState, cookies } = props;

  const [videoInfo, setVideoInfo] = useState(
    {
      duration: null,
      newMoment: "",
      startTime: 0,
      endTime: 0,
      selectedVideoID: props.selectedVideoID,
      selectedCat: "Categories",
      categories: [],
      title: '',
      moments: [],
      autoplay: 1,
      loop: 0
    }
  );

  const getMoments = (selectedVideoID) => {
    axios.get('http://localhost:3001/api/moments', {
      params: { selectedVideoID },
      withCredentials: true
    })
      .then((response) => {
        setVideoInfo((prev) => ({ ...prev, moments: response.data, startTime: 0 }));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (props.oldVideo) {
      getMoments(videoInfo.selectedVideoID);
    }
  }, [videoInfo.selectedCat]);

  return (
    <div className="Moments">
      <div className="content-container">
        <VideoPlayer videoInfo={videoInfo} setVideoInfo={setVideoInfo} state={state} setState={setState} />
        <MomentBar videoInfo={videoInfo} setVideoInfo={setVideoInfo} />

        <AutoButton setVideoInfo={setVideoInfo} />

        {!props.oldVideo &&
          <>
            <Save
              videoInfo={videoInfo}
              setVideoInfo={setVideoInfo}
              selectedCat={videoInfo.selectedCat}
              categories={props.categories}
              categWithId={props.categWithId}
              moments={videoInfo.moments}
              oldVideo={props.oldVideo}
              selectedVidId={props.selectedVidId}
              state={state}
              setState={setState} />
          </>
        }
        <NewMoment videoInfo={videoInfo} setVideoInfo={setVideoInfo} cookies={cookies} videoDBid={state.selectedVidId} state={state} setState={setState} oldVideo={props.oldVideo} />
        <MomentsList videoInfo={videoInfo} setVideoInfo={setVideoInfo} state={state} setSate={setState} />
      </div>
    </div>
  );
}