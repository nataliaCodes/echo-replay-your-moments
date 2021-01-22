import { useState } from 'react';

import Card from 'react-bootstrap/Card';

export default function VideoThumbnails(props) {

  const { state } = props;

  const thumbnails = !state.videos ? false : state.videos.map((video, i) => {

    //generate video thumbnails dynamically
    const categoryMatch = (video, i, props) => {
      if(video.cat_name === props.category) {
        return i
      }
    };

    const hasVids = categoryMatch(video, i, props);

    const youtubeId = video.link.slice(32, 43);
    const thumbnail = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;

    //render each video detail
    return hasVids === i ?
        <Card key={i} style={{width: "30em"}}>
          <Card.Header>
            <h6>{video.title}</h6>
          </Card.Header>
          <Card.Img variant="bottom" src={thumbnail} alt="thumbnail" />
        </Card>
        :
        <p>Category has no videos</p>
  });

  //render list based on videos existence
  return (
      <div className="VideoThumbnails">
        {thumbnails}
      </div>
  )
};