var express = require('express');
var videos = express.Router();

/* GET videos for specific user */
module.exports = ({
  getUserVidsAndCats,
  addVideo
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
    console.log(info);
    console.log("cat_id",cat_id)
    addVideo(userId, cat_id, link, title )
    .then(response =>{ 
      console.log("Query RES",response)
      res.json({ response, info })})
    .catch((err) => res.json({
      error: err.message
    }));

    // res.json("back-end says: YO videos!");

  });

  return videos;
};
