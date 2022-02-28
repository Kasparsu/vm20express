let express = require('express');
let router  = express.Router();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const DB = require('../database/db.js');

router.get('/register', (req, res) => {
    res.render('register.html');
});
  
router.post('/register', (req, res) => {
    let db = DB.getDB();
    db.run('INSERT INTO users (email, password) VALUES ($email, $password);', {
        $password: crypt(req.body.password),
        $email: req.body.email
    });
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('login.html');
});

router.post('/login', (req, res) => {
    let db = DB.getDB();
    db.get('SELECT * FROM users WHERE email=?', req.body.email, (err, result) => {
        
        if(check(req.body.password, result.password)){
            req.session.user = result;
            req.session.save();
        }
    });
   
    res.redirect('/');
});

function crypt(pass){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pass, salt);
    return hash;
}

function check(pass, hash){
    return bcrypt.compareSync(pass, hash);
}

module.exports = router;