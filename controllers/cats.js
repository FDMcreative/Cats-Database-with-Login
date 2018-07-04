const Cat = require('../models/cat');

function indexRoute(req,res) {
  Cat
    .find()
    .exec()
    .then( (cats) => {
      res.render('cats/index', {cats});
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

function newRoute(req,res) {
  res.render('cats/new');
}

function showRoute(req,res) {
  Cat
    .findById(req.params.id)
    .exec()
    .then((cat) => {
      if(!cat) return res.status(404).render('static/404');
      res.render('cats/show', {cat});
    })
    .catch((err) => {
      res.status(500).end(err)
    });
}

function createRoute(req,res) {
  Cat
    .create(req.body)
    .then(() => {
      res.redirect('/cats');
    })
    .catch((err) => {
      res.status(500).end(err)
    });
}

function editRoute(req,res) {
  Cat
    .findById(req.params.id)
    .exec()
    .then((cat) => {
      if(!cat) return res.status(404).render('static/404');
      res.render('cats/edit', {cat})
    });
}

function updateRoute(req,res) {
  Cat
    .findById(req.params.id)
    .exec()
    .then((cat) => {
      if(!cat) return res.status(404).render('static/404');
      // A For Loop equivalent to:
      // book.title = req.body.title;
      // book.author = req.body.author;
      // book.description = req.body.description;
      for(const field in req.body) {
        cat[field] = req.body[field];
      }
      return cat.save();
    })
    .then((cat) => {
      res.redirect(`/cats/${cat.id}`);
    })
    .catch((err) => {
      res.status(500).end(err);
    })
}

function deleteRoute(req,res) {
  Cat
    .findById(req.params.id)
    .exec()
    .then((cat) => {
      if(!cat) return res.status(404).render('static/404');
      return cat.remove();
    })
    .then(() => {
      res.redirect('/cats');
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

//export above functions
module.exports = {
  index: indexRoute,
  new: newRoute,
  show: showRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
}
