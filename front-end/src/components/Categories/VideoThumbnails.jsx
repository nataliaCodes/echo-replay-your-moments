import { useState } from 'react';
import { Link, useHistory, Redirect } from "react-router-dom";
import Card from 'react-bootstrap/Card';

export default function VideoThumbnails(props) {

  const { state, setState, onVideoSelected } = props;
  let history = useHistory();

  const thumbnails = state.videos
    .filter(video => video.cat_name === props.category)
    .map((video, i) => {
      
      const youtubeId = video.link.slice(32, 43);
      const thumbnail = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;

      const videoOnClick = () => {
        // props.onVideoSelected(youtubeId);
        setState((prev) => ({ ...prev, oldVideo: true, selectedVidId: youtubeId }));
        history.push('/moments', { update: true })

      };
  

      //render each video detail
      return (
          <Card key={i} style={{width: "30em"}} onClick={()=> videoOnClick()} >
            {/* <Link to="/moments"> */}
              <Card.Header>
                <h6>{video.title}</h6>
              </Card.Header>
              <Card.Img variant="bottom" src={thumbnail} alt="thumbnail" />
            {/* </Link> */}
          </Card>
      )
  });

  //render list based on videos existence
  return (
      <div className="VideoThumbnails">
        {thumbnails.length > 0 ? thumbnails : <p>Category empty, add some videos to see them here!</p>}
      </div>
  )
};