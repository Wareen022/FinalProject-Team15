var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');
var Inventory = require('../models/inventory');
var moment = require('moment-timezone');


router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

router.get('/', function(req, res) {
  Inventory.find( function(err, data, count) {
    res.render('tables', {tables: data,user:req.user});
  })
});


module.exports = router;
