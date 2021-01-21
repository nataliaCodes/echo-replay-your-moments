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
        const filteredNames = categoryNames.filter(function(name, i) {
          return categoryNames.indexOf(name) === i;
        });

        //extract array of categories with associated ids
        const duplicateCateg = response.map(vid => {

          const id = vid.category_id;
          const name = vid.cat_name;
          return {id, name}
        });
        console.log('duplicateCateg :', duplicateCateg);

        


        res.json({filteredNames, duplicateCateg, response});
      })
      .catch((err) => res.json({
        error: err.message
      }));

  });

  /* Update categories */ 
  categories.post('/', (req, res) => {
    const info = req.body;
    console.log(info);

    res.json("back-end says: cat name received!");

  });

  return categories;
};
