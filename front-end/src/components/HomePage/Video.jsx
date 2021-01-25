import { Link } from "react-router-dom"

import Card from 'react-bootstrap/Card';
// import "../../stylesheets/_video.scss";

function selectVideo(videoIdObj, onVideoSelected) {
  onVideoSelected(videoIdObj.videoId);

}

// function getCss(imageurl) {
//   const _styles = {
//     backgroundImage: `url(${imageurl})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center center",
//     height: "180px",
//     position: "relative"
//   };
//   return _styles;
// }

function constructVideoTitles(videosData, onVideoSelected) {
  return videosData.map(({ snippet, id }, index) => {
    // console.log("Video", id)
    const thumbnail = `https://img.youtube.com/vi/${id.videoId}/mqdefault.jpg`;
    if(id.videoId){      
      return (
         <>
          <Card key={index} className='userVideos' style={{ width: "23em" }} onClick={() => selectVideo(id, onVideoSelected)}>
              <Card.Header closeButton>
                {snippet.title}
              </Card.Header>
              <Card.Img variant="bottom" src={thumbnail} alt="thumbnail" />
              <br></br>
          </Card>
          <br></br>
        </>
      )
    }
  });
}

const Video = ({ data, onVideoSelected }) => {
  return( 
    <div id="search" className="search-result">
      <Link to="/moments" > 
        {constructVideoTitles(data, onVideoSelected)} 
      </Link>
    </div>
  )
};

export default Video;