const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {title: 'Zamudniki'});
});

/* GET room page */
router.get('/room', (req, res, next) => {
  res.render('room', {title: 'Zamudniki room'});
});

/* GET dashboard page */
router.get('/dashboard', (req, res, next) => {
  res.render('dashboard', {title: 'Zamudniki dashboard'});
});

/* GET login page */
router.get('/login', (req, res, next) => {
  res.render('login', {title: 'Login'});
});

/* GET registration page */
router.get('/registration', (req, res, next) => {
  res.render('registration', {title: 'Registration'});
});

module.exports = router;
