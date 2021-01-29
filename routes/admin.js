var express = require('express');
var router = express.Router();
var { getUsers, getUser, register, login, access } = require('../services/user');

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function (req, res, next) {
  register(req.body).then(response => {
    res.send(response);
  })
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login', function (req, res, next) {
  getUser(req.body.username).then(response => {
    if (response) {
      var token = login(req.body, response);
      res.cookie('token', token.token, { httpOnly: true });
      res.send(token);
    } else {
      res.send({ message: 'Wrong username' });
    }
  })
});

router.get('/access', function (req, res, next) {
  res.send(access(req.cookies.token));
});

module.exports = router;
