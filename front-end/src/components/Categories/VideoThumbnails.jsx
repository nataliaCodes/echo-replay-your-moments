import Card from 'react-bootstrap/Card';

import useApplicationData from '../../hooks/useApplicationData';

export default function VideoThumbnails(props) {

  //exract videos from state
  const { state } = useApplicationData();
  const videos = state.videos;

  const thumbnails = !videos ? false : videos.map((video, i) => {

    //generate video thumbnails dynamically
    const categoryMatch = video.cat_name === props.category;
    const youtubeId = video.link.slice(32, 43);
    const thumbnail = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;

    //render each video detail
    return categoryMatch && (

      <Card key={i} style={{width: "30em"}}>
        <Card.Header>
          <h6>{video.title}</h6>
        </Card.Header>
        <Card.Img variant="bottom" src={thumbnail} alt="thumbnail" />
      </Card>
      
    );
  });

  return (
    //render list
    <div className="VideoThumbnails">
      {thumbnails}
    </div>

  );
};