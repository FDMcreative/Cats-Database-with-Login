const User = require('../models/user');

function sessionsNew(req, res) {
  res.render('sessions/new');
}

function sessionsCreate(req, res, next) {
  User
     .findOne({ email: req.body.email })
     .then((user) => {
       if(!user || !user.validatePassword(req.body.password)) {
         return res.redirect('/login');
       }
       req.session.userId = user.id;
       req.session.isAuthenticated = true;

       res.redirect('/');
     })
     .catch(next);
}
 // LOGOUT
  // In order to log out we need to regenerate our session, and redirect the user to the homepage:
function sessionsDelete(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
