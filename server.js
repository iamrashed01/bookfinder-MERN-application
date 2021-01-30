const passport = require('passport');
const express = require('express');
require('express-async-errors');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// configs
const connectDB = require('./config/connectDB');

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads/'));
app.use(passport.initialize());
app.use(passport.session());

require('./services/googleStrategy');

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/book'));
app.use('/api/profile', require('./routes/user'));

// error handler route
app.use((err, req, res, next) => {
  if (err.message === 'access denied') {
    res.status(403);
    res.json({ error: err.message });
  } else {
    res.json({ error: err.message });
  }
});

// app listening
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  connectDB();
});
