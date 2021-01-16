var express = require('express');
var users = express.Router();

/* GET users listing. */
users.get('/', function(req, res, next) {
  res.json([
    {
      id: 1,
      first_name: 'first',
      last_name: 'last',
      email: 'test@test.com',
      password: 'password',
      categories: [1, 2, 8]
    },
    {
      id: 2,
      first_name: 'first',
      last_name: 'last',
      email: 'test@test.com',
      password: 'password',
      categories: [1, 2, 8]
    },
    {
      id: 3,
      first_name: 'first',
      last_name: 'last',
      email: 'test@test.com',
      password: 'password',
      categories: [1, 2, 8]
    }
  ])
});

users.post('/', (req, res) => {
  
});

users.get('/:id', (req, res) => {

  const id = req.params.id;
  console.log(id);

  res.json([
    {
      id: 2,
      first_name: 'first',
      last_name: 'last',
      email: 'test@test.com',
      password: 'password',
      categories: [1, 2, 8]
    }
  ])
});

module.exports = users;
