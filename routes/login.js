var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user) {
        if(!err){
            if(!user){
                req.flash('alertMessage', 'Invalid username or password!');
                res.redirect('/');
            }
            else{
                req.logIn(user, function(err) {
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

router.post('/register', function(req, res, next) {
    var user = {
        studentNumber: req.body.studentNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        section: req.body.section,

    };

    if (req.body.password != req.body.confirmPassword) {
        req.flash('alertMessage', "Passwords Don't Match");
        res.redirect('/');
    }
    studentData.register(new studentData(user), req.body.confirmPassword, function(err) {
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

router.post('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;
