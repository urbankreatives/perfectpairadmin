var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   

    name: {type: String, required: true},
    category: {type: String, required: true},
    type: {type: String, required: true},
    id:{type:String, required:true},
    qty: {type: Number, required: true},
  
    price: {type: Number, required: true},

  

});

module.exports = mongoose.model('Order2', schema);