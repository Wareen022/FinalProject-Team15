var express = require('express');
var router = express.Router();
var User = require('../model/studentData');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, User) {
        if(!err){
            if(!user){
                req.flash('alertMessage', 'Invalid username or password!');
                res.redirect('/login');
            }
            else{
                req.login(user, function(err) {
                    if(!err){
                        res.redirect('/');
                    }
                    else{
                        res.end(err);
                    }
                })
            }
        }
        else {
            res.end(err);
        }
    })(req, res, next);
});

router.post('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

module.exports = router;
