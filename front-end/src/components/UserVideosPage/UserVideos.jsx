import SearchBar from '../shared/SearchBar';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from '../shared/Button';
import axios from 'axios';

export default function UserVideos(props) {

  const videos = props.state.videos;

  const filterVid = (id) => {
    videos.filter((video) => 
      video.id !== id
    )
  }

  const videoList = videos && videos.map((video, index) => {


    const youtubeId = video.link.slice(32, 43);
    const thumbnail = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;

    const videoOnClick = () => {
      props.onVideoSelected(youtubeId);
      props.setState((prev) => ({ ...prev, oldVideo: true, selectedVidId: video.id }));
    };

    const handleOnClick = () => {
      console.log("CLICKED !!!!")
      
      return axios.delete('http://localhost:3001/api/videos', { params: video.id })
      .then(response => {
        console.log('client says: delete request sent');
        console.log(response.data);
        props.setState(prev =>({...prev, videos: videos.filter((vid)=> vid.id !== video.id)}))
      })
      .catch(err => { console.log('error:', err) })

    };

    return (
      <Card key={index} className='userVideos' style={{ width: "30em" }} onClick={() => videoOnClick()}>
        <Link to="/moments">
          <Card.Header>
            <h6>{video.title}</h6>
          </Card.Header>
          <Card.Img variant="bottom" src={thumbnail} alt="thumbnail" />
        </Link>
        <Button onClick={()=>handleOnClick()}>Delete</Button>
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