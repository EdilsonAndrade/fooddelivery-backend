const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:String,
    name:String,
    confirmed: Boolean, 
    thumbnail:String,
    confirmationId: String,
    expireDate: Date
})

module.exports = mongoose.model('User', UserSchema);