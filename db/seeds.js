const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
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
        images: [
          'https://cbsnews1.cbsistatic.com/hub/i/r/2011/09/30/91f6cb1f-a643-11e2-a3f0-029118418759/resize/620x465/30aeb6468b2b25d07324e6d4ef3c9b47/twofacedcat_AP1109280145869.jpg',
          'https://24.p3k.hu/app/uploads/2014/12/Frankenlouie960x6401.jpg',
          'https://www.twincities.com/wp-content/uploads/2015/11/20110929_092947_twoFaceCat.jpg?w=620'
        ]
      },{
        name: 'Bacini',
        age: '21 years',
        description: 'A very old cat with a bing drinking problem.',
        images: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Cat02.jpg/200px-Cat02.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
          'https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg'
        ]
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
