var express = require('express');
var router = express.Router();
var studentInfo = require('..model/studentData');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('register');
});

router.get('/', function(req, res) {
  studentInfo.find( function(err, studentsmongoose, count) {
    res.render('register', {students: student});
  })
});

router.post('/', function(req, res) {
  new StudentInfo({
  	firstName: req.body.firstName,
  	lastName: req.body.lastName,
  	studentNumber: req.body.studentNumber,
  	email: req.body.email,
  	section: req.body.section,
  	createdate: req.body.createdate,

  res.render('register');
});

module.exports = router;
