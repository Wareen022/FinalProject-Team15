var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/inventory/forms', function(req, res, next) {
  res.render('forms');
});

module.exports = router;