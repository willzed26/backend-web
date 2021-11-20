const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session ({
    secret:'som3_s3cret_keys',
    cookie: {}
}));

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

mongoose.connect(('mongodb+srv://john:asdzxc@cluster0.dg0vv.mongodb.net/ti2020?retryWrites=true&w=majority'),
                 (err, res) => {
                    if (err) {
                        console.err(err);
                    }
                    else {
                        console.log('Database Connected')
                    }
                 })
  
// const register =
app.listen('3000', () => {
    console.log('Server sudah berjalan di port 3000')
    //console.log(__dirname)
})
