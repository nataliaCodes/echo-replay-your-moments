const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const videosRouter = require('./routes/videos');
const categoriesRouter = require('./routes/categories');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const momentRouter = require('./routes/moments');

const app = express();

//set up CORS headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Origin', req.header('origin') );
  res.header('Access-Control-Allow-Credentials', true );
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/api/users', usersRouter(dbHelpers)); //remove when ready for deploy
app.use('/api/videos', videosRouter(dbHelpers));
app.use('/api/categories', categoriesRouter(dbHelpers));
app.use('/register', registerRouter(dbHelpers));
app.use('/login', loginRouter(dbHelpers));
app.use('/api/moments', momentRouter(dbHelpers));


module.exports = app;
