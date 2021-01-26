var express = require('express');
var login = express.Router();
const bcrypt = require('bcrypt');

module.exports = ({getUserByEmail}) => {

  login.post('/', (req, res) => {

      //deconstruct info sent from form
      const { email, password } = req.body.loginInput;
      
      //search DB for user email
      getUserByEmail(email)
        .then(user => {
  
            //if user exists check to see that the passwords match
            if (user) {
                
              const validAuth = bcrypt.compareSync(password, user.password)

              if (!validAuth) {
                res.json({
                  msg: 'Invalid credentials, try again!'
                });
              } else {
                res.json(user)
              }
  
            } else {
              res.json({
                msg: 'No user found matching credentials'
              });
            }
        })
        .catch(err => res.json({
            error: err.message
        }));
  });

  return login;
};