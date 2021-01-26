const { response } = require('express');
var express = require('express');
var moments = express.Router();

/* GET moments for user */
module.exports = ({
  getMomentsByVideo,
  getUserCategories,
  updateMoment,
  deleteMoment,
  addMoment
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

  /* Add moment */ 
  moments.post('/', (req, res) => {

    const { newValue, start, end, userId, vidId } = req.body;

    addMoment(newValue, start, end, userId, vidId)
      .then(response => {
        res.json(response);
      })
      .catch((err) => res.json({
        error: err.message
      }));
    

  });

  /* Update moments */ 
  moments.put('/', (req, res) => {

    const { id, newValue, interval } = req.body;

    const convertToSeconds = str => {
      var p = str.split(':'),
          s = 0, m = 1;
  
      while (p.length > 0) {
          s += m * parseInt(p.pop(), 10);
          m *= 60;
      }
  
      return s;
    }
    
    const startSec = convertToSeconds(interval.start);
    const endSec = convertToSeconds(interval.end);

    updateMoment(newValue, startSec, endSec, id)
      .then(response => {
        res.json(response);
      })
      .catch((err) => res.json({
        error: err.message
      }));

  });

  /* Delete moments */ 
  moments.delete('/', (req, res) => {

    deleteMoment(req.body.id)
      .then(response => {
        res.json(`backend says: deleted category ${req.body.id}`);
      })
      .catch((err) => res.json({
        error: err.message
      }));
    

  });

  return moments;
};