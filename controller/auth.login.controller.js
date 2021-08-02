const md5 = require('md5');
// const db = require('../db');
// const data = db.get('users').value();
const usersModel = require('../models/user.model')

module.exports.login = (req, res) => {
   res.render('login/loginAuth');
}   

module.exports.signIn = async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    var error = [];

    let findEmail = await usersModel.find({ email: email }).exec();
    // var account = data.filter( val => {
    //     if(val.email === email){    
    //         return val;
    //     }
    //     else {
    //         return;
    //     }
    // });  
    
    if (!email && !password) {
        error.push("Please enter your Email and Password");
        res.render('login/loginAuth', { 
            errorSignIn: error,
            values: req.body
        })
        return;
    } else if (!email) {
        error.push("Please enter your Email");
        res.render('login/loginAuth', {
            errorSignIn: error,
            values: req.body
        })
        return;
    } else if (!password) {
        error.push("Please enter your Password");
        res.render('login/loginAuth', {
            errorSignIn: error,
            values: req.body
        })
        return;
    }

    if (findEmail.length == 0) {
        error.push("Please check you account again !");
        res.render('login/loginAuth', {
            errorSignIn: error,
            values: req.body
        })
        return;
    }else if (findEmail[0].email == email && findEmail[0].password !== md5(password)) {
        error.push("Wrong password !");
        res.render('login/loginAuth', {
            errorSignIn: error,
            values: req.body
        })
        return;
    }

    if (findEmail[0].email === email && findEmail[0].password === md5(password)) {
        res.cookie('id', findEmail[0].id, {
            signed: true
        });
        res.redirect('/users');
    }
    next();
}

module.exports.confirmCookie = async (req, res, next) => {
    if (!req.signedCookies.id) {
        res.redirect('/login');
        return;
    }

    let confirmID = await usersModel.find({ id: req.signedCookies.id }).exec();
    // var user = db.get('users').find({id: req.signedCookies.id}).value();

    if(!confirmID) {
        res.redirect('/login');
        return;
    }else {
        next();
    }

}