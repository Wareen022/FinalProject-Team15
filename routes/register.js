var express = require('express');
var router = express.Router();
var studentInfo = require('../model/studentData');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('register');
});

//router.get('/', function(req, res) {
//  studentInfo.find( function(err, student, count) {
//    res.render('register', {students: title});
//  })
//});

router.post('/', function(req, res) {
  var user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    studentNumber: req.body.studentNumber,
    section: req.body.section,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  studentInfo.register(new studentInfo(user), req.body.confirmPassword, function(err) {
        if(!err){
            passport.authenticate('local', function(err, user) {
                req.logIn(user, function(err) {
                    if(!err){
                        res.redirect('/');
                    }
                    else{
                        res.end(err);
                    }
                })
            })(req, res, next);
        }
        else
        {
            req.flash('alertMessage', 'Sorry! Username already exists.');
            res.redirect('/');
          }
      });
   });




module.exports = router;
