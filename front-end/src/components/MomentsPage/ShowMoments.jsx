import React, { useState } from 'react';
import Button from '../shared/Button';
import VideoPlayer from '../VideoPlayer'
import List from '../shared/ListWithEditDelete';
import MomentBar from '../shared/MomentBar';
import NewMoment from './NewMoment';
import Save from './Save';
import useApplicationData from '../../hooks/useApplicationData';


export default function Moment(props) {
  const { state } = useApplicationData();

  const [videoInfo, setVideoInfo] = useState(
    {
      duration: 1000,
      startTime: 70,
      endTime: 100,
      selectedVideoID: props.selectedVideoID,
      selectedCat: "Categories",
      categories: []
    }
  )
  
  console.log("THIS ONE!!!: ", videoInfo)
  console.log("After Load: ", state);
  props.momentsBySelectedVid(videoInfo.selectedVideoID)
  return (
    <div className="Moment">
      {/* <SearchBar /> */}
      <VideoPlayer videoInfo = {videoInfo} setVideoInfo={setVideoInfo}/>
      <MomentBar videoInfo = {videoInfo} setVideoInfo={setVideoInfo}/>
      <Save videoInfo={videoInfo} setVideoInfo={setVideoInfo} selectedCat={videoInfo.selectedCat} categories={props.categories} />
      <Button>Save video</Button>
      <Button>Add moment</Button>
      <NewMoment />
      <List onVideos={true}>Moments</List>
      <Save videoInfo={videoInfo} setVideoInfo={setVideoInfo} selectedCat={videoInfo.selectedCat} categories={props.categories} />
    </div>
  );
}