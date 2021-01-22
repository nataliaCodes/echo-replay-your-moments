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
    console.log('userId :', userId);

    getUserCategories(userId)
    .then((response) => res.json(response))
    .catch((err) => res.json({
      error: err.message
    }));

  });

  /* Create categories */ 
  categories.post('/', (req, res) => {

    //get user id from cookies
    const userId = req.body.userId;
    // console.log('userId :', userId);

    console.log("new categ:", req.body.newCateg);
    const newCateg = req.body.newCateg;

    addCategory(newCateg)
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
    console.log("data:", req.body);

    updateCategory(newValue, id)
      .then(() => res.json(`back-end says: category ${id} updated to name ${newValue} in DB `))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  /* Delete categories */ 
  categories.delete('/', (req, res) => {

    console.log("delete data:", req.body);
    const id = req.body.id;
    console.log('id :', id);

    deleteCategory(id)
      .then(() => res.json(`back-end says: category ${id} deleted`))
      .catch((err) => res.json({
        error: err.message
      }));

  });

  return categories;
};
