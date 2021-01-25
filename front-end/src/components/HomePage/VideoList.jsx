import React from "react";

import Video from "./Video";

const VideoList = ({ data, onVideoSelected }) => {
  console.log(data)
  return (
    <div className="video-list">
      {/* <div style={{ padding: "20px 0" }}> */}
        <h3
          style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}
        >
          {data.lenght > 0 && <p>Search Result</p>}
        </h3>
        <Video data={data} onVideoSelected={onVideoSelected} />
      {/* </div> */}
    </div>
  );
};

export default VideoList;