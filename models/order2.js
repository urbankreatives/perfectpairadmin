var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   

    name: {type: String, required: true},
    category: {type: String, required: true},
    type: {type: String, required: true},
    typeX: {type: String, required: true},
    size: {type: String, required: true},
    color: {type: String, required: true},
    id:{type:String, required:true},
    qty: {type: Number, required: true},
    buyerName:{type:String, required:true},
    buyerMobile:{type:String, required:true},
    status2:{type:String,required:true},
    status3:{type:String,required:true},
    date:{type:String,required:true},
    price: {type: Number, required: true},
    status:{type:String,required:true},

  

});

module.exports = mongoose.model('Order2', schema);