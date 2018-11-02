var express = require('express');
var router = express.Router();

var Users = require('../models/users');
var Notes = require('../models/notes');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WLiT' });
});

router.get('/login', function(req, res) {
  res.render('login');
})

router.get('/signup', function(req, res) {
  res.render('signup');
})

router.post('/signup', function(req, res) {
  console.log('req........', req.body);
  var user = new Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  var promise = user.save()
  promise.then((user) => {
    console.log('user saved with values', user);
  })
});

router.post('/login', function(req, res) {
  if (req.body.username && req.body.password) {
    Users.findOne({username: req.body.username, password: req.body.password}, function(err, user) {
      console.log('logged in user is....', user);
      res.redirect('/');
    })
  } else {
    console.log('enter username and password');
  }
});

router.get('/addNote', function (req, res) {
  res.render('addNote');
});

router.post('/addNote', function(req, res) {
  var note = new Notes({
    title: req.body.title,
    note: req.body.note
  })
  var promise = note.save()
  promise.then((note) => {
    console.log('saved note is:', note);
    Notes.find().exec(function(err, notes) {
      res.render('viewNote', {notes})
    });
  });
});

router.get('/deletenote/:id', function(req, res) {
  Notes.findOneAndRemove({_id: req.params.id}, function(err, note) {
    console.log('deleted note is', note);
    res.redirect('/viewNote')
  });
})

router.get('/viewNote', function (req, res) {
  Notes.find().exec(function(err, notes) {
    res.render('viewNote', {notes})
  });
})

module.exports = router;
