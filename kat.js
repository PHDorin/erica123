var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var users = require('./config.js');

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(session({
    secret: 'kat is out of the bag',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 10000 }
}));

app.get('/', function(req, res) {
    res.render('signin');
});

app.get('/api/users', function(req, res) {
    users.find().exec(function(err, results) {
      res.status(200).send(results);
    });
});

app.get('/youarehere', function(req, res) {
    console.log('no really, you are here');
    res.render('youarehere');
});

app.post('/api/users', function(req, res) {
  var username = req.body.username;
  users.findOne({ username: username }).exec(function(err, results) {
      if (results) {
        return req.session.regenerate(function() {
          req.session.user = username;
          res.status(201);
          res.redirect('/youarehere');
        });
      } else {
        return req.session.regenerate(function() {
          req.session.user = username;
          res.status(201);
          console.log('who let the dogs out', username);
          new users({ username: username, password: 'fuckyou' }).save(function(err) {
              console.log(err);
          });
          res.redirect('/youarehere');
        });
      }
  });
});













app.listen(3030, function() {
    console.log('this bitch is listening...');
});
