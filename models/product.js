var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    filename: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    price2: {type: Number, required: true},
    status: {type: String, required: true},
    category: {type: String, required: true},
    zwl: {type: Number, required: true},
});

module.exports = mongoose.model('Product', schema);