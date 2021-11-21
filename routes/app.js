const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', (req, res) => {
   res.render('pages/index');
})

router.get('/login', (req, res) => {
    res.render('pages/login');
})

router.get('/signup', (req, res) => {
    res.render('pages/signup');
})

router.get('/contact', (req, res) => {
    res.render('pages/contact');
})

router.get('/MainMenu', (req, res) => {
    res.render('pages/Tampilandaftardankodekelas');
})

router.get('/logout', (req, res) => {
    req.session.isLoggedIn = false;
    res.redirect('/');
})

router.post('/login', async (req,res) => {
    const email_ = req.body.email;
    const password_ = req.body.password;

    datas = await User.find();
    await datas.forEach((data) => {
        if (email_ == data.email) {
            if (password_ == data.password) {
                req.session.isLoggedIn = true;
                res.redirect('/MainMenu');
            }
            else {
                res.render('pages/login', {error: 'Password Salah!'})
            }
        }
    });
    res.render('pages/login', {error: 'Email atau Password Salah!'});
})

router.post('/register', async (req, res) => {
    const name_ = req.body.name;
    const email_ = req.body.email;
    datas = await User.find();
    await datas.forEach((data) => {
        if (email_ == data.email) {
            res.render('pages/signup', {error: 'Email sudah terdaftar, silahkan login'})
        }
    })
    var password = req.body.password;
    const password_ = req.body.password_;
    if (password != password_) {
        res.render('pages/signup', {error: 'Password tidak sama'})
    }
    else {
        const user = new User({
            name: name_,
            email: email_,
            password: password_
        });
        await user.save((err, res) => {
            if (err) console.error(err);
            else {
                console.log('Sign In Succesful!')
            }
        }) 
        req.session.isLoggedIn = true;
        res.redirect('/login');
    }
})
module.exports = router;