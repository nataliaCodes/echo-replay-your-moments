const { response } = require('express');
var express = require('express');
var categories = express.Router();

/* GET categories for user */
module.exports = ({
  getUserVidsAndCats,
  updateCategory
}) => {
  categories.get('/', function(req, res, next) {

    //get user id from cookies
    const userId = req.cookies.user;

    getUserVidsAndCats(userId)
      .then(response => {

        //extract categories with ids attached
        const categWithId = response.map(vid => {
          const { category_id, cat_name } = vid
          return `${cat_name}${category_id}`;
        });

        //filter out duplicates
        const filteredCategsWithId = categWithId.filter((categ, i) => {
          return categWithId.indexOf(categ) === i;
        });

        //get only category names
        const categNames = filteredCategsWithId.map(name => name.substr(0, name.length - 1));

        res.json({filteredCategsWithId, categNames, response});
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
    const { newValue, id } = req.body;
    console.log("data:", req.body);

    updateCategory(newValue, id)
      .then(() => res.json(`back-end says: category ${id} updated to name ${newValue} in DB `))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return categories;
};
