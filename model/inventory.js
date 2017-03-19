var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventorySchema = new Schema({

object_name: {
    type: String,
    required: [true, 'Fill up Name']
},
  number_of_items_available: Number, 
  Room: Number,
  material_name: String
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

module.exports = mongoose.model('inventory', inventorySchema);