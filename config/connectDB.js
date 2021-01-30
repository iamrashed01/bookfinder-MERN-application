const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.bg2dp.mongodb.net/bookfinder?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log('mongoDB Server Connected'))
    .catch((error) => console.log('Server Couldn\'t connect', error));
};
