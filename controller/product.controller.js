// const db = require('../db');
// const data = db.get('products').value();

const ProductsModel = require('../models/product.model');

module.exports.product = (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let numProduct = 8;
    let start = (page - 1) * numProduct;
    let end = page * numProduct;

    // res.render('products/product', {
    //     products: data.slice(start, end)
    // });
    ProductsModel.find({}).then(products => {
        res.render('products/product', { 
            products: products.slice(start, end)
        })
    })
}

// Xử lý đồng bộ bằng Promise và bắt lỗi
// module.exports.searchProduct = (req, res) => {
//     let name = (req.query.product_name).toLocaleLowerCase()
//     ProductsModel.find()
//     .then(values => {
//         let filterName_Product = values.filter( val => {
//             return val.product_name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) != -1;
//         })
//         res.render('products/product', {
//             products: filterName_Product
//         })
//     })
//     .catch( err => {
//         console.log(err);
//     })
// }

// Xử lý bất động bộ với async và await
    module.exports.searchProduct = (req, res) => {
        let name = (req.query.product_name).toLocaleLowerCase()

        async function Async () {
            let product = await ProductsModel.find(); 
            return product;
        }

        Async().then( val => {
            let filterName_Product = val.filter( val => {
                return val.product_name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) != -1;
            })
            res.render('products/product', {
                products: filterName_Product
            })
        })
        .catch( err => {
            console.log(err);
        })
        
    }
