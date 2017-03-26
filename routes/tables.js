var express = require('express');
var router = express.Router();
var items = require('../model/inventory');

router.get('/', function(req, res, next) {
  res.render('tables');
});

router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/login')
  }else if (req.user.acctype!=='admin') {
    res.redirect('/login')
  }
  next();
});


module.exports = router;