import React, { useState } from 'react';
import axios from 'axios';

import VideoPlayer from '../VideoPlayer';
import Button from '../shared/Button';
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
      selectedVideoID: props.selectedVideoID,
      selectedCat: "Categories",
      categories: props.categories,
      title: '',
      moments: []
    }
  )

  const getCatAndMomByUser = (selectedVideoID) => {
  
    axios.get('http://localhost:3001/api/videos/', {
      params: {selectedVideoID},
      withCredentials: true
    })
    .then((response)=>{
      console.log('info sent to backend')
      console.log("ShowM",response)

    })
    .catch(err => console.log(err));
  };

  getCatAndMomByUser();

  
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