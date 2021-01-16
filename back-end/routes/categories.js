var express = require('express');
var categories = express.Router();

/* GET categories for user */
module.exports = () => {
categories.get('/', function(req, res, next) {
  res.json([
    {
      id: 1,
      name: 'Books'
    },
    {
      id: 2,
      name: 'Dance'
    },
    {
      id: 3,
      name: 'Life'
    }

    
  ])
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

return categories
}
