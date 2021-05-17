const mongoose = require('mongoose');

const db_url =  "mongodb://localhost:27017/NSAPDEVdb"


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
};

mongoose.connect(db_url, options);
module.exports = mongoose;