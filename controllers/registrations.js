const User = require('../models/user');

function registrationNew(req, res) {
  res.render('registrations/new');
}

function registrationCreate(req, res) {
  User
    .create(req.body)
    .then((user) => {
      req.flash('success', `Thanks for registering, ${user.username}!`);
      res.redirect('/login');
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        req.flash('danger', 'Passwords do not match');
        res.redirect('/register');
      }
      next(err);
    });
}

module.exports = {
  new: registrationNew,
  create: registrationCreate
};
