const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const {port, dbURI} = require('../config/environment');
mongoose.connect(dbURI);

const User = require('../models/user');
const Cat = require('../models/cat');

User.collection.drop();
Cat.collection.drop();

User
  .create([{
    username: 'federico',
    email: 'federico@gigi.com',
    password: 'passwordfederico',
    passwordConfirmation: 'passwordfederico'
  },{
    username: 'gigi',
    email: 'gigi@gigi.com',
    password: 'passwordgigi',
    passwordConfirmation: 'passwordgigi'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Cat
      .create([{
        name: 'Gatsby',
        age: '5 years',
        description: 'A happy cat with AIDS.',
        image: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
      },{
        name: 'Bacini',
        age: '21 years',
        description: 'A very old cat with a bing drinking problem.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Cat02.jpg/200px-Cat02.jpg'
      }]);

  })

  .then((cats) => {
    console.log(`${cats.length} cats created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
