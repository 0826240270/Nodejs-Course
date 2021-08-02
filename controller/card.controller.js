// const db = require('../db');
const cardsModel = require('../models/card.model');
var cardData = {
    code: 1
}
module.exports.addToCard = async (req, res) => {
    let productId = req.params.productId;
    let sessionID = req.signedCookies.sessionID;
    if (!sessionID) {
        res.redirect('/product');
        return;
    }
    
    var value = await cardsModel.find({_id: sessionID}, (err, data) => {
        if (err){
            return handleError(err);
        } else {
            return data;
        }
    });

    // Chưa set điều kiện mã id product trùng để tăng số lượng lên += 1

    if (value) {
        let newObj = {};
        newObj[productId] = 1;    
        cardsModel.updateOne({ _id: sessionID}, { $push: { "card": newObj } }, { "new": true, "upsert": true }, (err, doc) => {
            if (err) {
                return handleError(err);
            }
            return doc;
        });    
    }
    else {
        cardsModel.findByIdAndUpdate({ _id: sessionID}, { $set: { card: sum(...value) } }, (err, doc) => {
            if (err) {
                return handleError(err);
            }
            return doc;
            console.log(doc);
        })
    }

    // let count = db.get('session')
    //               .find({id: sessionID})
    //               .get('card.' + productId, 0)
    //               .value();

    // db.get('session')
    // .find({id: sessionID})
    // .set('card.' + productId, count + 1)
    // .write();
    res.redirect('/product');
} 

