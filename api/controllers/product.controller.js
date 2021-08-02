const ProductsModel = require('../../models/product.model');

module.exports.index = async (req, res) => {
    let productApi = await ProductsModel.find({}).exec();
    res.json(productApi);
}

module.exports.create = async (req, res) => {
    let product = await ProductsModel.create(req.body);
    res.json(product);
}

module.exports.delete = async (req, res) => {
    let product = await ProductsModel.deleteOneMany(req.body);
    res.json(product);
}
