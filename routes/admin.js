var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');
var Inventory = require('../models/inventory');
var studentData = require('../models/studentData');
var moment = require('moment-timezone');

router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  else if(req.user.auth !== "admin"){
    res.redirect('/inventory')
  }
  next();
});

router.get('/dashboard', function(req, res) {
  studentData.find( function(err, data, count) {
    res.render('dashboard', {users: data});
  })
});

router.post('/add', function(req, res) {
    new Inventory({
      materialName: req.body.materialName,
	    controlNumber: req.body.controlNumber,
	    numberOfItemsAvailable: req.body.numberOfItemsAvailable,
	    room: req.body.room,
	    website: req.body.website,
	    contact: req.body.contact,
	    createdate: moment().tz("Asia/Manila").format('LLL'),
	    image: req.body.image,
    }).save(function(err, data, count) {
      if(err) {
        console.log(err)
        res.render('add', {error:err})
      } else {
        res.redirect('/inventory')
      }
    })
});

router.get('/add', function(req, res) {
    res.render('add');
});

router.route('/delete/:id')
  .all(function(req, res, next) {
    itemId = req.params.id;
    inventory = {};
    Inventory.findById(itemId, function(err, item) {
      inventory = item;
      next();
    });
  })
  .get(function(req, res) {
    inventory.remove(function(err, data) {
      if(err) {
        res.status(400).send("Error removing data: " + err);
      } else {
        // res.send('Data removed');
        res.redirect('/inventory');
      }
    });
  });



router.route('/promote/:id')
  .all(function(req, res, next) {
    userId = req.params.id;
    user = {};
    studentData.findById(userId, function(err, data) {
      user = data;
      next();
    });
  })
  .post(function(req, res) {
    user.auth = 'admin',
    user.save(function(err, data, count) {
      if(err) {
        // res.status(400).send('Error saving data: ' + err);
        console.log(err)
        res.render('dashboard', {user: user, error:err})
      } else {
        res.redirect('/admin/dashboard');
      }
    });
  })

router.route('/regular/:id')
  .all(function(req, res, next) {
    userId = req.params.id;
    user = {};
    studentData.findById(userId, function(err, data) {
      user = data;
      next();
    });
  })
  .post(function(req, res) {
    user.auth = '',
    user.save(function(err, data, count) {
      if(err) {
        // res.status(400).send('Error saving data: ' + err);
        console.log(err)
        res.render('dashboard', {user: user, error:err})
      } else {
        res.redirect('/admin/dashboard');
      }
    });
  })


module.exports = router;
