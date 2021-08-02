const shortid = require('shortid');
// const db = require('../db');
// const data = db.get('users').value();

const usersModel = require('../models/user.model')

module.exports.getMainPage = (req, res) => {
    res.render('home')
}

module.exports.getTemplateUsers = async (req, res) => {
    let dataUsers = await usersModel.find({});
    res.render('users/templateUsers', {
        users: dataUsers
    });
}

module.exports.getProfile = (req, res) => {
    res.render('users/profile');
}

module.exports.getSearchUsers = (req, res) => {
    var valueName = req.query.name;
    var matchedName = data.filter(val => {
        return val.name.toLocaleLowerCase().indexOf(valueName.toLocaleLowerCase()) != -1;
    })
    res.render('users/templateUsers', {users: matchedName});
}

module.exports.getviewID = async (req, res) => {
    var id = req.params.id;

    let dataUser = await usersModel.find({_id: id}).exec();

    //var data = db.get('users').find({id: id}).value();
    res.render('users/viewID', {users: dataUser[0]._doc})
}
