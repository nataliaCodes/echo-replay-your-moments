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

        const categoryNames = response.map(vid => vid.cat_name);
        const categories = categoryNames.filter(function(name, i) {
          return categoryNames.indexOf(name) === i;
        });

        res.json({categories, response});
      })
      .catch((err) => res.json({
        error: err.message
      }));

  });

  /* Create a new category */ 
  categories.post('/', (req, res) => {

    const id = req.params.id;
    console.log(id);

  });

  /* Update a specific category */ 
  categories.post('/:id', (req, res) => {

    const id = req.params.id;
    console.log(id);

  });

  return categories;
};
