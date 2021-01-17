var express = require('express');
var users = express.Router();

//get all users
module.exports = ({
  getUsers
}) => {

  /* GET users listing. */
  users.get('/', (req, res) => {
      getUsers()
          .then((users) => res.json(users))
          .catch((err) => res.json({
              error: err.message
          }));
  });

  return users;
};
