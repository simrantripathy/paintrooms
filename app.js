const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const morgan = require('morgan');

const app = express();

  //middleware
  app.use(express.static('public'));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

  //view engine
  app.set('view engine', 'ejs');

  //database connection
  const dbURI = 'mongodb+srv://simrantripathy:abcd1234@paintrooms.f1b82.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(process.env.PORT || 3000))
  .catch((err) => console.log(err));

  //routes
  app.get('*', checkUser);
  app.get('/', (req, res) => res.render('home'));
  app.get('/user', requireAuth, (req, res) => res.render('user'));
  app.get('/task', (req, res) => res.redirect('/tasks'));
  app.get('/courses', (req, res) => res.render('courses'));
  app.use(authRoutes);
  
  //tasks routes
  app.use('/tasks', taskRoutes);

  // 404 page
  app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
  });