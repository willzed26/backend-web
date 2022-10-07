const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose')

let config;
try {
    config = require("./config");
} catch (e) {
    console.log("No config file found");
    process.exit(0);
}

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

mongoose.connect((`mongodb+srv://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}?retryWrites=true&w=majority`),
    (err, res) => {
        if (err) {
            console.err(err);
            }
        else {
            console.log('Database Connected')
            }
        })

const indexRouter = require('./routes/index');
const classRouter = require('./routes/class');

app.use('/', indexRouter);
app.use('/', classRouter);

  
app.listen(process.env.PORT || 3000, () => {
    console.log("server is active");
  });