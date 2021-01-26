var express = require('express');
var videos = express.Router();

/* GET videos for specific user */
module.exports = ({
  getUserVidsAndCats,
  addVideo,
  deleteVideo
}) => {
  videos.get('/', function (req, res, next) {

    //get user id from cookies
    const userId = req.cookies.user;

    getUserVidsAndCats(userId)
      .then(response => res.json({ response }))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  /* Add Video */ 
  videos.post('/', (req, res) => {
    //get user id from cookies
    const userId = req.cookies.user;
    const info = req.body;
    const { cat_id, link, title } = req.body.videoSaveInfo;
    addVideo(userId, cat_id, link, title )
    .then(response =>{ 
      res.json({ response, info })})
    .catch((err) => res.json({
      error: err.message
    }));

  });

    /* Delete video */ 
    videos.delete('/', (req, res) => {
      // const id = req.body;
      const id = req.query[0]
  
      deleteVideo(id)
        .then(() => res.json(`back-end says: video ${id} deleted`))
        .catch((err) => res.json({
          error: err.message
        }));
  
    });

  return videos;
};
