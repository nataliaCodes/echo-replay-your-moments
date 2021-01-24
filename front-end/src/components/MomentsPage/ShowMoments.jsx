import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import VideoPlayer from '../VideoPlayer';
import Button from '../shared/Button';
import EditDelete from './EditDeleteListMoments';
import MomentBar from '../shared/MomentBar';
import NewMoment from './NewMoment';
import Save from './Save';
import AutoButton from './AutoButton'



export default function Moment(props) {

  const { state, setState, cookies } = props;
  
  // console.log("oldVideo:",props.oldVideo)
  console.log("state on Moment:",state)

  const [videoInfo, setVideoInfo] = useState(
    {
      duration: null,
      newMoment: "",
      startTime: 0,
      endTime: state.videoDuration,
      selectedVideoID: props.selectedVideoID,
      selectedCat: "Categories",
      categories: [],
      title: '',
      moments: [],
      autoplay: null,
      loop: 0
    }
  )
    console.log('videoInfo on moments :', videoInfo);

  const getMoments = (selectedVideoID) => {
    // console.log("vidID to DB:", selectedVideoID)
    axios.get('http://localhost:3001/api/moments', {
      params: {selectedVideoID},
      withCredentials: true
    })
    .then((response)=>{
      // console.log("fromDBmoms",response.data)
      setVideoInfo((prev)=>({...prev, moments: response.data, startTime: 0 }))
    })
    .catch(err => console.log(err));
  };

  // const getCategory = () => {
  //   axios.get('http://localhost:3001/api/moments/categories', {
  //     params: {},
  //     withCredentials: true
  //   })
  //   .then((response)=>{
  //     console.log("fromDBcats",response.data)
  //     setVideoInfo((prev)=>({...prev, categories: response.data }))
  //   })
  //   .catch(err => console.log(err));
  // };

  // const getCatid = () => {
  //   let catId;
  //   console.log("SHOWMOMENT:", videoInfo.selectedCat);
  //   console.log("SHOWMOMENT:", props.categWithId);
  //   catId = props.categWithId.find(categ => categ.name === videoInfo.selectedCat);
  //   console.log("SHOWmfindID", catId);
  //   setVideoInfo((prev)=>({...prev, categoryId: catId }))

  // };

    useEffect(() => {
      if(props.oldVideo){
        getMoments(videoInfo.selectedVideoID);
      }
      // if(videoInfo.selectedCat){

      //   getCatid();
      // }
    }, [videoInfo.selectedCat]);
    // console.log("videoInfo after axios", videoInfo)
    
  return (
    <div className="Moments">
      {/* <SearchBar /> */}
      <VideoPlayer videoInfo = {videoInfo} setVideoInfo={setVideoInfo} state={state} setState={setState} />
      <MomentBar videoInfo = {videoInfo} setVideoInfo={setVideoInfo}/>
      
      <AutoButton setVideoInfo={setVideoInfo} />
      
      { !props.oldVideo &&
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
      <NewMoment videoInfo = {videoInfo} setVideoInfo={setVideoInfo} cookies={cookies} videoDBid={state.selectedVidId} state={state} setState={setState} />
      <EditDelete videoInfo = {videoInfo} setVideoInfo={setVideoInfo} state={state} setSate={setState} />
    </div>
  );
}