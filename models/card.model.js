const mongoose = require('mongoose');
const { Schema } = mongoose;

// Thiết kế lại docs
var cardSchema = new Schema ({
    _id: String, 
    card: Array
}, { versionKey: false})

var cardsModel = mongoose.model('sessions', cardSchema);

module.exports = cardsModel;