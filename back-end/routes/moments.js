const { response } = require('express');
var express = require('express');
var moments = express.Router();

/* GET moments for user */
module.exports = ({
  getMomentsByVideo,
  getUserCategories,
  updateMoment,
  deleteMoment
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
    const updated = req.body.updated;

    const id = updated.moment_id;
    const newValue = updated.label;

    updateMoment(newValue, id)
      .then(response => {
        res.json(`category ${id} renamed to ${newValue}`);
      })
      .catch((err) => res.json({
        error: err.message
      }));

  });

  /* Delete categories */ 
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