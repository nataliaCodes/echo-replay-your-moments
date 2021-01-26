const { response } = require('express');
var express = require('express');
var categories = express.Router();

/* GET categories for user */
module.exports = ({
  getUserCategories,
  addCategory,
  updateCategory,
  deleteCategory  
}) => {
  categories.get('/', function(req, res, next) {

    //get user id from cookies
    const userId = req.cookies.user;

    getUserCategories(userId)
    .then((response) => res.json(response))
    .catch((err) => res.json({
      'error categories.js row 21': err.message
    }));

  });

  /* Create categories */ 
  categories.post('/', (req, res) => {

    //get user id from cookies
    const userId = req.body.userId;

    const newCateg = req.body.newCateg;

    addCategory(newCateg, userId)
    .then((data) => {
      res.json(`back-end says: category ${newCateg} inserted into DB`)
    })
    .catch((err) => res.json({
      error: err.message
    }));

  });

  /* Update categories */ 
  categories.put('/', (req, res) => {

    //extract values passed by front-end
    const { newValue, id } = req.body;

    updateCategory(newValue, id)
      .then(() => res.json(`back-end says: category ${id} updated to name ${newValue} in DB `))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  /* Delete categories */ 
  categories.delete('/', (req, res) => {

    const id = req.body.id;

    deleteCategory(id)
      .then(() => res.json(`back-end says: category ${id} deleted`))
      .catch((err) => res.json({
        error: err.message
      }));

  });

  return categories;
};
