const express = require('express')
const UserData = require('../models/user')
const MongoClient = require('mongodb').MongoClient
const router = express.Router()

MongoClient.connect("mongodb+srv://john:asdzxc@cluster0.dg0vv.mongodb.net/ti2020?retryWrites=true&w=majority", { useUnifiedTopology: true })
.then(client => {
    console.log('Connected to Database')
    // untuk pilih DB
    const db = client.db('HaloDocDatabase')
    const userDB = db.collection('User');
    const doctorDB = db.collection('Doctor');
    const articleDB = db.collection('Artikel');

    router.get('/', (req, res) => {
        res.render('pages/index')
    })
    
    router.get('/SignUp', (req, res) => {
        res.render('pages/SignUp')
    })
    
    router.get('/LogIn', (req, res) => {
        res.render('pages/LogIn')
    })

    router.get('/Contact', (req, res) => {
        res.render('pages/contact')
    })
    
    router.post(('/authentication'), async (req, res)=>{
        const email = req.body.email;
        const password = req.body.password;
    
        // untuk pilih collection
        userDB.find().toArray().then(result => {
            let isLogin = false; 

            result.forEach((data) => {
                if (email == data.email && password == data.password) {
                    req.session.isLoggedIn = true;
                    req.session.name = data.name;
                    res.render('pages/security');
                    isLogin = true;
                }
            })

            if (isLogin == false) {
                res.render('pages/index', { error: "email dan password tidak terdaftar!" });
            }
        })
        .catch(error => console.error(error))
    })

    router.get(('/logout'), (req, res) => {
        res.render('pages/validasidokter')
    })

    // untuk logout
    // req.session.isLoggedIn = false;
    // req.session.name = "";
})

// app.get("/userprofile" ,(req,res) =>{
//     res.render("userprofile");
// })
// //Auth Routes
// app.get("/login",(req,res)=>{
//     res.render("login");
// });

// app.get("/register",(req,res)=>{
//     res.render("register");
// });
module.exports = router;