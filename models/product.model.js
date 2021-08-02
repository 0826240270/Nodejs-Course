const mongoose = require('mongoose');
const { Schema } = mongoose;

var productSchema = new Schema ({
    id: String,
    product_name: String,
    image:  String,
    description: String
}, { versionKey: false});

var productModel = mongoose.model('products', productSchema);

module.exports = productModel;