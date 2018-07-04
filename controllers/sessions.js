const User = require('../models/user');

function sessionsNew(req,res) {
  res.render('sessions/new');
}

function sessionsCreate(req,res,next) {
  User
    .findOne({email: req.body.email})
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.redirect('/login');
      }
      //get id to maintain the Login
      req.session.userId = user.Id;
      req.session.isAuthenticated = true;

      res.redirect('/');
    })
    .catch(next);
}
//regenerate session to logout
function sessionsDelete(req,res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
