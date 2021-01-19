import Card from 'react-bootstrap/Card';

import useApplicationData from '../../hooks/useApplicationData';

export default function VideoThumbnails(props) {

  const { state } = useApplicationData();
  const videos = state.videos;

  const thumbnails = !videos ? false : videos.map(video => {

    const categoryMatch = video.cat_name === props.category;
    const youtubeId = video.link.slice(32, 43);
    const thumbnail = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;

    return categoryMatch && (

      <Card style={{width: "30em"}}>
        <Card.Header>
          <h6>{video.title}</h6>
          {/* <li>{video.link}</li> */}
        </Card.Header>
        <Card.Img variant="bottom" src={thumbnail} alt="thumbnail" />
      </Card>
      
    );
  });

  return (
    
    <div className="VideoThumbnails">
      {thumbnails}
    </div>

  );
};