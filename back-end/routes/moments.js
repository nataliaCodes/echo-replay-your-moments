const { response } = require('express');
var express = require('express');
var moments = express.Router();

/* GET moments for user */
module.exports = ({
  getMomentsByVideo,
  getUserCategories
}) => {
  moments.get('/', function(req, res, next) {

    //get user id from cookies
    const userId = req.cookies.user;
    const selectedVideoID = req.query.selectedVideoID;

    getMomentsByVideo(userId, selectedVideoID)
      .then(response => {
        res.json(response)
      })
      .catch((err) => res.json({
        error: err.message
    }));

  });

  //gets category for showMoment page
  moments.get('/categories', function(req, res, next) {

    //get user id from cookies
    const userId = req.cookies.user;
  
    getUserCategories(userId)
    .then(response => {
      res.json(response);
    })
    .catch((err) => res.json({
      error: err.message
    }));

  });

  /* Update moments */ 
  moments.put('/', (req, res) => {
    const info = req.body;
    console.log(info);



    res.json("back-end says: YO!");

  });

  return moments;
};