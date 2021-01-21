const { response } = require('express');
var express = require('express');
var moments = express.Router();

/* GET moments for user */
module.exports = ({
  getMomentsByVideo
}) => {
  moments.get('/', function(req, res, next) {

    //get user id from cookies
    const userId = req.cookies.user;

    const selectedVideoID = req.query.selectedVideoID;
  
    getMomentsByVideo(userId, selectedVideoID)
      .then(response => {
        console.log("mRES",response)
        res.json(response);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  
        // res.json('backend recieved call')

  });

  /* Update moments */ 
  moments.post('/', (req, res) => {
    const info = req.body;
    console.log(info);

    res.json("back-end says: cat name received!");

  });

  return moments;
};