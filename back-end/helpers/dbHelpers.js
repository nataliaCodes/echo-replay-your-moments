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

  const getMomentsByVideo = (id, videoId) => {

      const query = {
          text: `SELECT m.id as moment_id, m.label, m.start_time, m.end_time FROM moments as m JOIN videos as v ON v.id = m.video_id WHERE v.link LIKE '%' || $2 || '%' AND v.user_id = $1 ORDER BY m.id;`,
          values: [id, videoId]
      }
      return db.query(query)
      .then(result => result.rows)
      .catch(err => console.log(err));
  };

  const updateCategory = (updatedName, categId) => {

    const query = {
      text: `UPDATE categories
            SET name=$1
            WHERE id=$2
            RETURNING *`,
      values: [updatedName, categId]
    }
    return db.query(query)
    .then(result => result.rows)
    .catch(err => console.log(err));
  };

  const addCategory = (name) => {
    const query = {
      text: `INSERT INTO categories name VALUES $1 RETURNING *` ,
      values: [name]
    }
    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
  };

  const deleteCategory = (id) => {
    const query = {
      text: `DELETE FROM categories WHERE id=$1 RETURNING *` ,
      values: [id]
    }
    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
  };

  return {
      getUsers,
      getUserByEmail,
      addUser,
      getUserVidsAndCats,
      getMomentsByVideo,
      updateCategory
  };
};