var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventorySchema = new Schema({

materialName: {
    type: String,
    required: [true, 'Fill up Name']
},
controlNumber: {
    type: Number,
    required: [true, 'Fill up Control Number']
},
  numberOfItemsAvailable: Number, 
  room: Number,
  materialNname: String,
  createDate: Date,
  updateDate: String,
  notes: [{
    postedDate: {
      type: Date,
      'default': Date.now
    }, 
    note: String
  }]
});


module.exports = mongoose.model('inventory', inventorySchema);