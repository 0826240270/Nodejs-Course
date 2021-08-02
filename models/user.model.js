const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    age: String,
    phone: Number,
    password: String,
    avatar: String
}, { versionKey: false});

var usersModel = mongoose.model('users', userSchema);

module.exports = usersModel;