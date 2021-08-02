const mongoose = require('mongoose');
const { Schema } = mongoose;

var tokenConfirm = new Schema ({
    csrfToken: String,
    usersId: String,
    email: String,
    money: Number
}, { versionKey: false});

var tokenTransfer = mongoose.model('tokenTransfers', tokenConfirm);

module.exports = tokenTransfer;
