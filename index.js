const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose')
const app = express()

app.use(express.static("public"));
app.set('view engine', 'ejs');
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

mongoose.connect(('mongodb+srv://john:asdzxc@cluster0.dg0vv.mongodb.net/users?retryWrites=true&w=majority'),
    (err, res) => {
        if (err) {
            console.err(err);
            }
        else {
            console.log('Database Connected')
            }
        })

const indexRouter = require('./routes/app');
const classRouter = require('./routes/class');

app.use('/', indexRouter);
app.use('/', classRouter);

  
app.listen(process.env.PORT || 3000, () => {
    console.log("server is active");
  });