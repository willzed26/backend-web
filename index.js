const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const app = express()

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session ({
    secret: 'som3_secre3t_keys',
    cookie: {}
}))

mongoose.connect(('mongodb+srv://john:asdzxc@cluster0.dg0vv.mongodb.net/ti2020?retryWrites=true&w=majority')
, (err, res) => {
    if (err){
        console.error(err);
    }
    else{
        console.log('Database Terhubung!');
    }
})

const indexRouter = require('./routes/index')
app.use('/', indexRouter)

// app.use(require("express-session")({
// secret:"zxcsadwqe",//decode or encode session
//     resave: false,          
//     saveUninitialized:false    
// });

// passport.serializeUser(User.serializeUser());       //session encoding
// passport.deserializeUser(User.deserializeUser());   //session decoding
// passport.use(new LocalStrategy(User.authenticate()));
// app.use(bodyParser.urlencoded(
//       { extended:true }
// ))
// app.use(passport.initialize());
// app.use(passport.session());

// app.get("/", (req,res) =>{
//     res.render("index");
// })
// app.get("/userprofile",isLoggedIn ,(req,res) =>{
//     res.render("userprofile");
// })
// //Auth Routes
// app.get("/login",(req,res)=>{
//     res.render("login");
// });
// app.post("/login",passport.authenticate("local",{
//     successRedirect:"/userprofile",
//     failureRedirect:"/login"
// }),function (req, res){
// });

// app.get("/register",(req,res)=>{
//     res.render("register");
// });

// app.post("/register",(req,res)=>{
    
//     User.register(new User({username: req.body.username,email: req.body.email}),req.body.password,function(err,user){
//         if(err){
//             console.log(err);
//             res.render("register");
//         }
//     passport.authenticate("local")(req,res,function(){
//         res.redirect("/login");
//     })    
//     })
// })

// app.get("/logout",(req,res)=>{
//     req.logout();
//     res.redirect("/");
// });
// function isLoggedIn(req,res,next) {
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }


app.listen('3000', () => {
    console.log('Server sudah berjalan di port 3000')
})