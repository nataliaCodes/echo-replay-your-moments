import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import SearchBar from '../shared/SearchBar';

import Card from 'react-bootstrap/Card';
import Button from '../shared/Button';
import Alert from 'react-bootstrap/Alert';

export default function UserVideos(props) {
  const videos = props.state.videos;

  const [showAlert, setShowAlert] = useState(false);
  const [alertVid, setAlertVid] = useState(null);


  const handleAlert = vid => {
    setAlertVid(vid);
    setShowAlert(true);
  };

  const handleDelete = (video) => {

    setShowAlert(false);
    
    return axios.delete('http://localhost:3001/api/videos', { params: video.id })
    .then(response => {
      console.log('client says: delete request sent');
      console.log(response.data);
      props.setState(prev =>({...prev, videos: videos.filter((vid)=> vid.id !== video.id)}))
    })
    .catch(err => { console.log('error:', err) })

  };

//------------------------------------------------------------------//
  const videoList = videos && videos.map((video, index) => {

    const youtubeId = video.link.slice(32, 43);
    const thumbnail = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;

    const videoOnClick = () => {
      props.onVideoSelected(youtubeId);
      props.setState((prev) => ({ ...prev, oldVideo: true, selectedVidId: video.id }));
    };

    return (

      <>
       <Card key={index} className='userVideos' style={{ width: "30em" }} onClick={() => videoOnClick()}>
          <Link to="/moments">
            <Card.Header>
              <h6>{video.title}</h6>
            </Card.Header>
            <Card.Img variant="bottom" src={thumbnail} alt="thumbnail" />
          </Link>
          <Button onClick={()=>handleAlert(video)}>Delete</Button>
        </Card>
      </>
      
    );
  });

  return (
    <>
      <div className="user-videos">
        <h4>All User Videos</h4>
        {/* <SearchBar /> */}
        <Alert show={showAlert} variant="danger" style={{width: "20em"}}>
        <Alert.Heading>Delete Video</Alert.Heading>
        {alertVid && <p>"{alertVid.title}"</p>}
        <p>Will be removed and cannot be undone. Proceed?</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowAlert(false)}>Cancel</Button>
          <Button onClick={() => handleDelete(alertVid)} variant="outline-danger">
            Proceed
        </Button>
        </div>
      </Alert>
        <ul>{videoList}</ul>
      </div>
    </>
  );
}