const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const Book = require('./models/book');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Mongoose 
mongoose.connect('mongodb://localhost:27017/bookshop');
var db = mongoose.connection;
db.on('error', console.error.bind(console, "# MongoDB - Connection Error"));

// Session
app.use(session({
  secret: 'mynewscretitjiks',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
}))

// Save to session
app.route('/cart')
.get(function(req, res){
  if(typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
})
.post(function(req, res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err) throw err;
    res.json(req.session.cart);
  });
})

//  API Routes
app.route('/books')
.get(function(req, res){
  Book.find({}, function(err, books){
    if(err) throw err;
    res.json(books);
  });
})
.post(function(req, res){
  Book.create(req.body, function(err, book){
    if(err) throw err;
    res.json(book);
  });
});

app.route('/books/:_id')
.put(function(req, res){
  Book.findOneAndUpdate({ _id: req.params._id }, {
    '$set': {
      title: req.body.title,
      description: req.body.description,
      images: req.body.images,
      price: req.body.price
    },
  }, { new: true }, function(err, book){
    if(err) throw err;
    res.json(book);
  });
})
.delete(function(req, res){
  Book.remove({ _id: req.params._id }, function(err, book){
    if(err) throw err;
    res.json(book);
  });
})

// Get Books Images
app.get('/books/images', function(req, res){
  const imgFolder = __dirname + '/public/img/';

  fs.readdir(imgFolder, function(err, files){
    if(err) console.log(err);
    filesArray = [];

    files.forEach(function(file){
      filesArray.push({ name: file })
    })

    res.json(filesArray);
  })
})

app.listen(3001, function(err){
  if(err) return console.log(err);
  console.log("API Server Running on http://localhost:3001");
})
