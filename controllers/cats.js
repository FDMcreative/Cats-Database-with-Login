const Cat = require('../models/cat');

function indexRoute(req,res) {
  Cat
    .find()
    // .exec()
    .then((cats) => res.render('cats/index', {cats}));
    // .catch((err) => {
    //   res.status(500).end(err);
    // });
}

function newRoute(req,res) {
  res.render('cats/new');
}

function createRoute(req,res) {
  Cat
    .create(req.body)
    .then(() => res.redirect('/cats'));
    // .catch((err) => {
    //   res.status(500).end(err)
    // });
}

function showRoute(req, res, next) {
  Cat
    .findById(req.params.id)
    // .exec()
    .then((cat) => {
      if(!cat) res.notFound();
      const err = new Error('Not Found');
      res.render('cats/show', { cat });
    })
    .catch(next);
}

function editRoute(req, res) {
  Cat
    .findById(req.params.id)
    // .exec()
    .then((cat) => {
      if(!cat) return res.notFound();
      res.render('cats/edit', {cat});
    });
}

function updateRoute(req,res) {
  Cat
    .findById(req.params.id)
    // .exec()
    .then((cat) => {
      if(!cat) return res.notFound();

      // A For Loop equivalent to:
      // book.title = req.body.title;
      // book.author = req.body.author;
      // book.description = req.body.description;
      for(const field in req.body) {
        cat[field] = req.body[field];
      }

      return cat.save();
    })
    .then((cat) => res.redirect(`/cats/${cat.id}`));
}

function deleteRoute(req, res) {
  Cat
    .findById(req.params.id)
    // .exec()
    .then((cat) => {
      if(!cat) return res.notFound();
      return cat.remove();
    })
    .then(() => res.redirect('/cats'));
}

//export above functions
module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
}
