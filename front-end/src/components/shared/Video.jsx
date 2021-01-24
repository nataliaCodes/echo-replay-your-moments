import { Link } from "react-router-dom"
// import "../stylesheets/_video.scss";
function selectVideo(videoIdObj, onVideoSelected) {
  onVideoSelected(videoIdObj.videoId);
}
function getCss(imageurl) {
  const _styles = {
    backgroundImage: `url(${imageurl})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "180px",
    position: "relative"
  };
  return _styles;
}
function constructVideoTitles(videosData, onVideoSelected) {
  return videosData.map(({ snippet, id }, index) => {
    return (
      <div
        className="video"
        key={index}
        onClick={() => selectVideo(id, onVideoSelected)}>
        <div style={getCss(snippet.thumbnails.high.url)} key={index} />
        <p className="title">{snippet.title}</p>
      </div>
    );
  });
}
const Video = ({ data, onVideoSelected }) => {
  return <> <Link to="/moments"> {constructVideoTitles(data, onVideoSelected)} </Link></>;
};

export default Video;