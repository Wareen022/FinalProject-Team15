var express = require('express');
var router = express.Router();
var studentInfo = require('..model/studentData');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('register');
});

router.post('/forms', function(req, res) {
  new StudentInfo({
  	firstName: req.body.firstName,
  	lastName: req.body.lastName,
  	studentNumber: req.body.studentNumber,
  	email: req.body.email,
  	section: req.body.section.
  });

  res.render('register');
});

module.exports = router;
