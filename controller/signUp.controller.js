const shortid = require('shortid');
//const db = require('../db');
const md5 = require('md5');
const usersModel = require('../models/user.model');

module.exports.pageSignUp = (req, res) => {
    res.render('login/signUp');
}

module.exports.signUp = async (req, res, next) => {
    let name = req.body.name;
    let email = req.body.email;
    let age = req.body.age;
    let phone = req.body.phone;
    let password = req.body.password;
    let id = shortid.generate();

    let searchEmail = await usersModel.find({email: email}).exec();

    //let searchEmail = db.get('users').find({email: email}).value();
    var errorMessage = [];
    req.body.id = id;
    req.body.avatar = req.file.path.split("\\").slice(1).join("\\");
    req.body.password = md5(password); 

    if (searchEmail.length == 0){
        if (!name) {
            errorMessage.push('Please enter your name');
        } else if (!email) {
            errorMessage.push('Please enter your email');
        } else if (!age) {
            errorMessage.push('Please enter your age');
        } else if (!phone) {
            errorMessage.push('Please enter your phone');
        } else if (!password) {
            errorMessage.push('Please enter your password');
        }
    } else if (searchEmail) {
        if (searchEmail[0].email === email) {
            errorMessage.push('Email already exist ! Please try another email');
        } 
    }
    
    if (errorMessage.length > 0) {
        res.render('login/signUp', {
            errorSignUp: errorMessage,
            values: req.body
        })
    } else {
        let accountUser = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            phone: req.body.phone,
            password: req.body.password,
            avatar: req.body.avatar
        }
        usersModel.create(accountUser, (err, success) => {
            if(err){
                return handleError(err);
            }
        });
        res.redirect('/login');
        //db.get('users').push(req.body).write();
    }  
    next();
}
