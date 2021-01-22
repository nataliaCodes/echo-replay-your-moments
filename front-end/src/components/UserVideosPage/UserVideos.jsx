import SearchBar from '../shared/SearchBar';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export default function UserVideos(props) {

  const videos = props.state.videos;

  const videoList = videos && videos.map((video, index) => {

    const youtubeId = video.link.slice(32, 43);
    const thumbnail = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;

    const videoOnClick = () => {
      props.onVideoSelected(youtubeId);
      props.setState((prev) => ({ ...prev, oldVideo: true, selectedVidId: videos.id }));
    };

    return (
      <Card key={index} className='userVideos' style={{ width: "30em" }} onClick={() => videoOnClick()}>
        <Link to="/moments">
          <Card.Header>
            <h6>{video.title}</h6>
          </Card.Header>
          <Card.Img variant="bottom" src={thumbnail} alt="thumbnail" />
        </Link>
      </Card>
    );
  });

  return (
    <div className="user-videos">
      <h4>All User Videos</h4>
      {/* <SearchBar /> */}
      <ul>{videoList}</ul>
    </div>
  );
}