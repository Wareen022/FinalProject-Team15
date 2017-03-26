var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index');
});

router.use(function(req, res, next) {
  if (!req.studentData) {
    res.redirect('/login')
  }else if (req.user.acctype!=='admin') {
    res.redirect('/login')
  }
  next();
});
module.exports = router;