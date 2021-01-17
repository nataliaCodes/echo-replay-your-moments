var express = require('express');
var register = express.Router();

module.exports = () => {


  //handles input from register form
  register.post('/', (req, res) => {

    const { newUser } = req.body;
    console.log(newUser);

  })
  return register;
};


// //gets register page
// register.get('/', (req, res) => {
//   const templateVars = {
//     user: users[req.session.user_id]
//   };
  
//   res.render('register', templateVars);
// });

// register.post('/', (req, res) => {
//   console.log(req.body);
// });

// //handles input on register page
// app.post('/register', (req, res) => {
//   //storing email and password as plain text
//   const { email, password } = req.body;

//   const templateVars = {
//     email,
//     password,
//     error: 'Check your spelling and try again!',
//     error2: '(Input fields cannot be empty)'
//   };

//   //if any of the two fields are empty, send error
//   if (!email || !password) {
//     return res.render('error', templateVars);
//   }
  
//   //if the email address is already in use, send error
//   if (getUser(email, users)) {
//     return res.render('error', templateVars);
//   }
  
//   //else, create new user with email and hashed password
//   const id = generateRandomId(); //<-- generates new user id
//   const hashedPassword = bcrypt.hashSync(password, 10);

//   const newUser = {
//     id,
//     email,
//     password: hashedPassword
//   };
  
//   //add user to users database
//   users[newUser.id] = newUser;
  
//   //create cookie with user id
//   req.session.user_id = id;
//   res.redirect('/urls');
// });
