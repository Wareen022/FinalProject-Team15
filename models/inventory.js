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
  createDate: Date,
  updateDate: String,
  image: String,
  notes: [{
    postedDate: {
      type: Date,
      'default': Date.now
    }, 
    note: String
  }]
}, { collection: 'inventorySchemay' });


module.exports = mongoose.model('inventory', inventorySchema);