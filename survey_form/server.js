
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render("index");
})
app.post('/process', function(req, res) {
    console.log(req.body)
    req.session.name = req.body.name;
    req.session.loclist = req.body.localist;
    req.session.lanlist = req.body.lanlist;
    req.session.comment = req.body.comment;
    
    res.redirect('/result');
})

app.get('/result', function(req, res) {
    res.render('result',{ name: req.session.name ,location: req.session.loclist, language: req.session.lanlist ,  comment : req.session.comment });
})



// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
