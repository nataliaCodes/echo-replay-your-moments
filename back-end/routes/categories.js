const { response } = require('express');
var express = require('express');
var categories = express.Router();

/* GET categories for user */
module.exports = ({
  getUserVidsAndCats,
  updateCategory,
  addCategory,
  deleteCategory,
  addIntoJoinTable
}) => {
  categories.get('/', function(req, res, next) {

    //get user id from cookies
    const userId = req.cookies.user;

    getUserVidsAndCats(userId)
      .then(response => {
      
        //DO NOT DELETE BELOW COMMENTS!  
        //TO DO: clean up data handling 
        //by sending array of objects to front-end instead of array of strings
        //as below pseudocode demonstrates
        //build {categ_id: categ_name}!!!
        // const categObj = {}
        // response.forEach(
        //   categ[categId] = categname;
        // )
        //const categArr = Object.keys(categObj)
        //const categArr = Object.entries(categObj).map(([id, name]) => ({id, name}))

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

  /* Create categories */ 
  categories.post('/', (req, res) => {

    //get user id from cookies
    const userId = req.cookies.user;
    console.log('userId :', userId);

    console.log("new categ:", req.body.newCateg);
    const newCateg = req.body.newCateg;

    addCategory(newCateg)
      .then((data) => {

        //extract new category id
        const newId = data.id;

        //update join table
        addIntoJoinTable(userId, newId)
          .then(() => res.json(`back-end says: category ${newCateg} inserted into both tables `))
          .catch(err => console.log('error adding into join table', err));
      })
      .catch((err) => res.json({
        error: err.message
      }));

  });

  /* Update categories */ 
  categories.put('/', (req, res) => {

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

  /* Update categories */ 
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
