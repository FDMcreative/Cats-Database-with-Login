const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const expressLayouts = require('express-ejs-layouts');
const routes = require('./config/routes');
const session = require('express-session');
const flash = require('express-flash'); //it must come after the sessions cause they rely on session cookies, check below
const User = require('./models/user');
const {port, dbURI} = require('./config/environment');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//setup express app
const app = express();
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`)

//setup database
mongoose.connect(dbURI);

//middleware
app.use(morgan('dev'));
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended:true}));

// Use methodOverride
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'ssh it\'s a secret',
  resave: false,
  saveUninitialized: false
}));
//after m.msession
app.use(flash());

app.use((req,res,next) => {
  // console.log(req.session);
  //if they are not logged in, jump to next middleware
  if(!req.session.isAuthenticated) return next();
  //if they are logged in
  User
  .findById(req.session.userId)
  .then((user) => {
    if(!user) {
      res.redirect('/');
    }

    req.session.userId = user.id;

    res.locals.user = user;
    res.locals.isAuthenticated = true;

    next();
  });
});

app.use(routes);
app.listen(port, () => console.log(`express is listening on port ${port}`));
