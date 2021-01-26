const express = require('express');
const register = express.Router();
const bcrypt = require('bcrypt');

module.exports = ({
  getUserByEmail,
  addUser
}) => {

  //handles input from register form
  register.post('/', (req, res) => {

    //deconstruct info sent from form
    const { firstName, lastName, email, password } = req.body.userInput;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const avatar = 'https://raw.githubusercontent.com/schenn1992/smart_TODO_list/master/public/avatars/identicon3.png';
    

    //search DB for user email
    getUserByEmail(email)
      .then(user => {

          //if user exists send back message, else insert user into DB
          if (user) {
              res.json({
                  msg: 'Sorry, a user account with this email already exists'
              });

          } else {
              return addUser(firstName, lastName, email, hashedPassword, avatar);
          }
      })
      //then send the new user back to the browser
      .then(newUser => res.json(newUser))
      .catch(err => res.json({
          error: err.message
      }));

  })
  return register;
};
