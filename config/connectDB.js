const { O_RDWR } = require('constants');

const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://localhost/bookfinder',
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log('mongoDB Server Connected'))
    .catch(() => console.log('Server Couldn\'t connect'));
};
