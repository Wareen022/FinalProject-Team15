var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Student= new Schema({
  firstName: String,
  lastName: String,
  studentNumber: String,
  section: String,
  auth: String,
  // password: String,
  // passwordConfirm: String,
  // createdate: Date,
  // updatedate: String,
  // notes: [{
  //   postedDate: {
  //     type: Date,
  //     'default': Date.now
  //   }, 
  //   note: String
  // }]
}, { collection: 'Student' });

Student.plugin(passportLocalMongoose);

module.exports = mongoose.model('studentData', Student);