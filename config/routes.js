// const router = require('express').Router();
const express = require('express');
const router = express.Router();
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');
const catsController = require('../controllers/cats');
const secureRoute = require('../lib/secureRoute');

//normal mode
router.get('/', (req,res) => res.render('statics/index'));
//concise mode
router.route('/cats')
  .get(catsController.index)
  .post(secureRoute, catsController.create);

router.route('/cats/new')
  .get(secureRoute, catsController.new);

router.route('/cats/:id')
  .get(catsController.show)
  .put(secureRoute, catsController.update)
  .delete(secureRoute, catsController.delete);

router.route('/cats/:id/edit')
  .get(secureRoute, catsController.edit);

router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);
  
router.route('/logout')
  .get(sessionsController.delete);

router.all('*', (req, res) => res.notFound());

module.exports = router;
