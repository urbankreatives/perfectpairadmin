var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    num: {type: String, required: true},
    make:{type:String, required:true}

});

module.exports = mongoose.model('Models', schema);