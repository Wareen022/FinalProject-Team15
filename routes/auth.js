var passport = require('passport');
var studentData = require('../models/studentData');
var express = require('express');
var router = express.Router();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;



router.route('/register')
  .get(function(req, res, next) {
    res.render('register', {});
  })
  .post(function(req, res, next) {
    studentData.register(new studentData({username: req.body.username,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            studentNumber: req.body.studentNumber,
                            section:req.body.section,
                            }), req.body.password, function(err, account) {
      if(err) {
        console.log(err)
        return res.render('register', {account: account, error:err});
      }
      req.login(account, function(err) {
        res.redirect('/');
      });
    })
  })
router.get('/log-in', function(req, res, next) {
  res.render('log-in', {user: req.user});

});

router.get('/login', function(req, res, next) {
  res.render('login', {user: req.user});

});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/auth/log-in'}),
  function(req, res) {
    res.redirect('/inventory');
  });

router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;