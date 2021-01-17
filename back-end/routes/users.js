var express = require('express');
var users = express.Router();

// /* GET users listing. */
// users.get('/', function(req, res, next) {
//   res.json([
//     {
//       id: 1,
//       first_name: 'first',
//       last_name: 'last',
//       email: 'test@test.com',
//       password: 'password',
//       categories: [1, 2, 8]
//     },
//     {
//       id: 2,
//       first_name: 'first',
//       last_name: 'last',
//       email: 'test@test.com',
//       password: 'password',
//       categories: [1, 2, 8]
//     },
//     {
//       id: 3,
//       first_name: 'first',
//       last_name: 'last',
//       email: 'test@test.com',
//       password: 'password',
//       categories: [1, 2, 8]
//     }
//   ])
// });

// users.post('/', (req, res) => {

// });

// users.get('/:id', (req, res) => {

//   const id = req.params.id;
//   console.log(id);

//   res.json([
//     {
//       id: 2,
//       first_name: 'first',
//       last_name: 'last',
//       email: 'test@test.com',
//       password: 'password',
//       categories: [1, 2, 8]
//     }
//   ])
// });

// module.exports = users;

module.exports = ({
  getUsers,
  getUserByEmail,
  addUser,
}) => {

  /* GET users listing. */
  users.get('/', (req, res) => {
      getUsers()
          .then((users) => res.json(users))
          .catch((err) => res.json({
              error: err.message
          }));
  });


  // //handle post to /api/users
  // users.post('/', (req, res) => {
  //     const {
  //         first_name,
  //         last_name,
  //         email,
  //         password
  //     } = req.body;
  //     getUserByEmail(email)
  //         .then(user => {
  //             if (user) {
  //                 res.json({
  //                     msg: 'Sorry, a user account with this email already exists'
  //                 });
  //             } else {
  //                 return addUser(first_name, last_name, email, password)
  //             }
  //         })
  //         .then(newUser => res.json(newUser))
  //         .catch(err => res.json({
  //             error: err.message
  //         }));
  // })
  return users;
};
