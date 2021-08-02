const db = require('../db');

const tokenTransfer = require('../models/transfer.model');

module.exports.transferForm = (req, res) => {
    res.render('transfer/transfer', {
        csrfToken: req.csrfToken()
    });
}

module.exports.transferMoney = (req, res) => {
    let userTransfer = {
        csrfToken: req.csrfToken(),
        userId: req.signedCookies.id,
        email: req.body.email,
        money: parseInt(req.body.money) 
    }

    tokenTransfer.create( userTransfer, (err) => {
        if (err) return handleError(err);
    })

    //db.get('tokenTransfer').push(userTransfer).write();
    res.redirect('/transfer');
}