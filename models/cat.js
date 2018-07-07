const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: {type:String, required:true},
  age: {type:String},
  description: {type:String},
  images: [{type:String}]
});

module.exports = mongoose.model('Cat', catSchema);
