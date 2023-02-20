var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   
    cart: {type: Object, required: true},

    user: {type: Schema.Types.ObjectId, ref: 'User'},

    paymentId: {type: String, required: true}
});

module.exports = mongoose.model('Order', schema);