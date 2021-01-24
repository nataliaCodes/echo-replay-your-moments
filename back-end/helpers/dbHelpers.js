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

  const getUserCategories = userId => {

    const query = {
      text: `SELECT id, name FROM categories WHERE user_id = $1 ORDER BY id ASC;`,
      values: [userId]
    }
    return db.query(query)
    .then(result => result.rows)
    .catch(err => console.log(err));

  };

  const updateCategory = (updatedName, categId) => {

    const query = {
      text: `UPDATE categories SET name=$1 WHERE id=$2 RETURNING *`,
      values: [updatedName, categId]
    }
    return db.query(query)
    .then(result => result.rows)
    .catch(err => console.log(err));
  };

  const addCategory = (name, userId) => {
    const query = {
      text: `INSERT INTO categories (name, user_id) VALUES ($1, $2) RETURNING *` ,
      values: [name, userId]
    }
    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => console.log('error', err));
  };

  const deleteCategory = id => {
    const query = {
      text: `DELETE FROM categories WHERE id=$1 RETURNING *` ,
      values: [id]
    }
    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
  };

  const addVideo = (userId, catId, link, title) => {
    const query = {
      text: `INSERT INTO videos (title, link, user_id, category_id) VALUES ($1, $2, $3, $4) RETURNING *` ,
      values: [title, link, userId, catId]
    }
    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => console.log('error', err));
  };

  const deleteVideo = (id) => {
    const query = {
      text: `DELETE FROM videos WHERE id=$1 RETURNING *` ,
      values: [id]
    }
    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
  };

  const updateMoment = (newValue, start, end, id) => {

    const query = {
      text: `UPDATE moments SET label=$1, start_time=$2, end_time=$3 WHERE id=$4 RETURNING *`,
      values: [newValue, start, end, id]
    }
    return db.query(query)
    .then(result => result.rows)
    .catch(err => console.log(err));

  };

  const deleteMoment = id => {
    const query = {
      text: `DELETE FROM moments WHERE id=$1 RETURNING *` ,
      values: [id]
    }
    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
  };

  const addMoment = (label, start, end, userId, videoId) => {
    const query = {
      text: `INSERT INTO moments (label, start_time, end_time, user_id, video_id) VALUES ($1, $2, $3, $4, $5) RETURNING *` ,
      values: [label, start, end, userId, videoId]
    }
    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err.message);
  };

  return {
      getUsers,
      getUserByEmail,
      addUser,
      getUserVidsAndCats,
      getMomentsByVideo,
      updateCategory,
      addCategory,
      deleteCategory,
      getUserCategories,
      updateMoment,
      deleteMoment,
      addVideo,
      deleteVideo,
      addMoment
  };
};