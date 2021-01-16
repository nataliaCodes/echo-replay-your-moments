const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const videosRouter = require('./routes/videos');
const categoriesRouter = require('./routes/categories');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/api/users', usersRouter); //remove when ready for deploy
app.use('/api/videos', videosRouter);
app.use('/api/categories', categoriesRouter);

module.exports = app;
