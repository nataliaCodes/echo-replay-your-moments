module.exports = (db) => {

  const getUsers = () => {
      const query = {
          text: 'SELECT * FROM users',
      };
      return db
          .query(query)
          .then((result) => result.rows)
          .catch((err) => err);
  };
  
  const getUserByEmail = email => {
      const query = {
          text: `SELECT * FROM users WHERE email = $1` ,
          values: [email]
      }
      return db
          .query(query)
          .then(result => result.rows[0])
          .catch((err) => err);
  };

  const addUser = (firstName, lastName, email, password, avatar) => {
      const query = {
          text: `INSERT INTO users (first_name, last_name, email, password, avatar) 
                  VALUES ($1, $2, $3, $4, $5) RETURNING *` ,
          values: [firstName, lastName, email, password, avatar]
      }
      return db.query(query)
          .then(result => result.rows[0])
          .catch(err => err);
  };


  const getUserVidsAndCats = id => {
    const query = {
      text: `SELECT v.id, v.title, v.link, v.category_id, c.name AS cat_name
          FROM videos as v INNER JOIN categories as c 
          ON v.category_id = c.id 
          WHERE v.user_id = $1;` ,
      values: [id]
    }
    return db.query(query)
      .then(result => result.rows)
      .catch(err => console.log(err));
  };

  return {
      getUsers,
      getUserByEmail,
      addUser,
      getUserVidsAndCats
  };
};