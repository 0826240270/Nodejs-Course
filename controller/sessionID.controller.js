const shortid = require('shortid');
//const db = require('../db');
const mongoose = require('mongoose');
const cardsModel = require('../models/card.model');

module.exports.sessionID = async (req, res, next) => {
    if (!req.signedCookies.sessionID) {
        let sessionID = shortid.generate();
        res.cookie('sessionID', sessionID, {
            signed: true
        })

        let sessionCard = {
            _id: sessionID
        }

        cardsModel.create(sessionCard, (err) => {
            if(err) return handleError(err);
        })

        //db.get('session').push({id: sessionID}).write();
    }
    next();
}