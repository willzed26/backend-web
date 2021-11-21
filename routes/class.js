const express = require('express');
const router = express.Router();
const Kelas = require('../models/classs')

router.get('/MainMenu', (req, res) => {
    res.render('pages/MainMenu', {kelas: classs.generateArray() });
})

router.get('/createclass', (req, res) => {
    res.render('pages/createclass');
})
router.get('/joinclass', (req, res) => {
    res.render('pages/joinclass');
})
router.get('/TampilanDalamKelas', (req, res) => {
    res.render('pages/TampilanDalamKelas');
})

router.get('/logout', (req, res) => {
    req.session.isLoggedIn = false;
    res.redirect('/');
})



router.post('/joinclass', async (req,res) => {
    const codeclass_ = req.body.codeclass;

    datas = await Kelas.find();
    await datas.forEach((data) => {
        if (codeclass_ == data.codeclass) {
            res.render('pages/Tampilandaftardankodekelas')
        }
        else {
            res.render('pages/joinclass', {error: 'Kode Kelas Tidak Ditemukan!'})
        }
    });
})

router.post('/createclass', async (req, res) => {
    const classname_ = req.body.classname;
    const description_ = req.body.description;
    const codeclass_ = req.body.codeclass;
    datas = await Kelas.find();
    await datas.forEach((data) => {
        if (codeclass_ == data.codeclass) {
            res.render('pages/createclass', {error: 'Kode Kelas sudah digunakan, coba lagi!'})
        }
    })
    const kelas = new Kelas({
        classname: classname_,
        description: description_,
        codeclass: codeclass_
    });
    await kelas.save((err, res) => {
        if (err) console.error(err);
        else {
            console.log('Kelas Berhasil Dibuat!')
        }
    }) 
    res.redirect('/Mainmenu');
    
    // var password = req.body.password;
    // const password_ = req.body.password_;
    // if (password != password_) {
    //     res.render('pages/signup', {error: 'Password tidak sama'})
    // }
    // else {
    // }
})
module.exports = router;