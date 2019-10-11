const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    address:String,
    number: String,
    addressLine: String,
    zipCode: String,
    nickName: String,
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    }

});

module.exports = mongoose.model('Address',AddressSchema)