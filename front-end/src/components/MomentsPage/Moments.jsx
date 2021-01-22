import { useState } from 'react';
import ShowMoments from './ShowMoments';
import NewMoments from './NewMoments';

export default function Moments(props) {

  const { oldVideo, state, setState } = props;
  
  console.log("oldVideo:",props.oldVideo)

  const [videoInfo, setVideoInfo] = useState(
    {
      duration: 1000,
      startTime: 70,
      endTime: 100,
      selectedVideoID: props.selectedVideoID,
      selectedCat: "Categories",
      categories: [],
      title: '',
      moments: []
    }
  )

  return oldVideo ? <ShowMoments state={state} setState={setState} videoInfo={videoInfo} setVideoInfo={setVideoInfo} /> : <NewMoments state={state} setState={setState} />
};