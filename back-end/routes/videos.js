var express = require('express');
var videos = express.Router();

/* GET videos for specific user */
module.exports = ({
  getUserVidsAndCats
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

  return videos;
};
