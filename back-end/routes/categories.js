const { response } = require('express');
var express = require('express');
var categories = express.Router();

/* GET categories for user */
module.exports = ({
  getUserVidsAndCats
}) => {
  categories.get('/', function(req, res, next) {

    //get user id from cookies
    const userId = req.cookies.user;

    getUserVidsAndCats(userId)
      .then(response => {

        console.log(response);

        //extract array of category names
        const categoryNames = response.map(vid => vid.cat_name);
        const filteredNames = categoryNames.filter((name, i) => {
          return categoryNames.indexOf(name) === i;
        });

        res.json({filteredNames, response});
      })
      .catch((err) => res.json({
        error: err.message
      }));

  });

  /* Update categories */ 
  categories.post('/', (req, res) => {

    //get user id from cookies
    const userId = req.cookies.user;

    //extract values passed by front-end
    const {newValue, oldValue } = req.body;
    console.log("data:", req.body);

    res.json("back-end says: cat name received!");

  });

  return categories;
};
