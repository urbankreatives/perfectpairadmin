var mongoose = require('mongoose');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
  
    id: {type: String, required: true},
    qty: {type: Number, required: true},
    type: {type: String, required: true},
    typeX: {type: String, required: true},
    size: {type: String, required: true},
    color: {type: String, required: true},

    category: {type: String, required: true}
});

module.exports = mongoose.model('Product Stats', schema);