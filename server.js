var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
	mongoose = require('mongoose'),
	session = require('express-session');

var User = require('./models/user');

mongoose.connect('mongodb://localhost/sound-bites');

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: 'askldfjalwkefhjasdkjch',
	cookie: { maxAge: 60000 }
}));

// middleware to manage sessions
app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user.id;
  };

  // finds user currently logged in based on `session.userId`
  req.currentUser = function (callback) {
    User.findOne({_id: req.session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };

  // destroy `session.userId` to log out user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  next();
});

app.get('/logout', function (req, res, next) {
	req.logout();
	res.redirect('/');
});

app.get('/', function (req, res, next) {
	res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/signup', function (req, res, next) {
	res.sendFile(__dirname + '/public/views/signup.html')
});

app.post('/signup', function (req, res) {
	var newUser = req.body;
	console.log(newUser);

	User.createSecure(newUser, function (err, user) {
		req.login(user);
		res.redirect('/');
	});
});

app.get('/login', function (req, res, next) {
	res.sendFile(__dirname + '/public/views/login.html')
});

app.post('/login', function (req, res) {
	var userData = req.body;

	User.authenticate(userData, function (err, user) {
		if(err === 1) {
			console.log(user);
			res.sendFile(__dirname + '/public/views/error.html');
		} else if (err === 2) {
			console.log(user);
			res.sendFile(__dirname + '/public/views/error.html');
		} else {
		req.login(user);
		res.redirect('/');
		}
	});
});

//API
app.get('/api/me', function(req, res) {
	req.currentUser(function (err, user) {
		if (user) {
			res.send(user);
		} else {
			res.send(null);
		}
	});
});

app.listen(process.env.PORT || 3000);