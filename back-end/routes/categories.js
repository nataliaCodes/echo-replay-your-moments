const { response } = require('express');
var express = require('express');
var categories = express.Router();

/* GET categories for user */
module.exports = ({getUserCategories}) => {
  categories.get('/', function(req, res, next) {

    //get user id from cookies
    const userId = req.cookies.user;

    //get categories based on user id
    getUserCategories(userId)
        .then(response => {

          //map over response to get just the names
          const categoryNames = response.map(cat => cat.name);

          //filter out name duplicates
          const categories = categoryNames.filter(function(name, i) {
            return categoryNames.indexOf(name) === i;
          })
            res.json(categories);
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
