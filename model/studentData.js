var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var studentSchema = new Schema({

  studentNumber: {
    type: String,
    required: [true, 'Fill up Student Number']
    
  },
  lastName: {
    type: String,
    required: [true, 'Fill up Last Name']
  },
    firstName: {
    type: String,
    required: [true, 'Fill up First Name']
  },
  firstName: String,
  lastName: String,
  studentNumber: String,
  section: String,
  password: String,
  passwordConfirm: String,
  createdate: Date,
  updatedate: String,
  notes: [{
    postedDate: {
      type: Date,
      'default': Date.now
    }, 
    note: String
  }]
});

studentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('studentData', studentSchema);