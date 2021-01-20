import React, { useState } from 'react';
import Button from '../shared/Button';
import VideoPlayer from '../VideoPlayer'
import List from '../shared/ListWithEditDelete';
import MomentBar from '../shared/MomentBar';
import NewMoment from './NewMoment';
import Save from './Save';

export default function Moment(props) {
  
  const [videoInfo, setVideoInfo] = useState(
    {
      duration: 1000,
      startTime: 70,
      endTime: 100,
      selectedVideoID: props.selectedVideoID
    }
  )

  return (
    <div className="Moment">
      {/* <SearchBar /> */}
      <VideoPlayer videoInfo = {videoInfo} setVideoInfo={setVideoInfo}/>
      <MomentBar videoInfo = {videoInfo} setVideoInfo={setVideoInfo}/>
      <Button>Save video</Button>
      <Button>Add moment</Button>
      <NewMoment />
      <List onVideos={true}>Moments</List>
      <Save />
    </div>
  );
}