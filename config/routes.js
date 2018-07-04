const express = require('express');
const router = express.Router();
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');
const cats = require('../controllers/cats');

function secureRoute(req,res,next) {
  if(!req.session.isAuthenticated || !req.session.userId) {
    return req.session.regenerate( () => {
      req.flash('danger', 'You must be logged in');
      res.redirect('/login');
    });
  }
  next();
}

//normal mode
router.get('/', (req,res) => res.render('static/index'));
//concise mode
router.route('/cats')
  .get(cats.index)
  .post(cats.create);
router.route('/cats/new')
  .get(cats.new);
router.route('/cats/:id')
  .get(cats.show)
  .put(cats.update)
  .delete(cats.delete);
router.route('/cats/:id/edit')
  .get(cats.edit);

router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);
router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);
router.route('logout')
  .get(sessionsController.delete);

module.exports = router;
