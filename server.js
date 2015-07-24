var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
	mongoose = require('mongoose'),
	session = require('express-session');

// Inport Models
var db = require('./models/models');
var Map = require('./models/map');

mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/sound-bites');

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: 'ask23788foawe7fy98hfiuaujiuhweflaushdo87iwhf982398fhwaep',
	cookie: { maxAge: 5 * 60 * 1000 }
}));

// sessions middleware
app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user.id;
  };

  // finds user currently logged in based on `session.userId`
  req.currentUser = function (callback) {
    db.User.findOne({_id: req.session.userId}, function (err, user) {
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

app.get('/', function (req, res, next) {
	res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/profile', function (req, res, next) {
	req.currentUser(function (err, user) {
		if(user) {
			res.sendFile(__dirname + '/public/views/profile.html');
		} else {
			res.redirect('/login');
		}
	})
});

app.get('/signup', function (req, res, next) {
	res.sendFile(__dirname + '/public/views/signup.html')
});

app.post('/signup', function (req, res) {
	var newUser = req.body;
	
	db.User.createSecure(newUser, function (err, user) {
		req.login(user);
		res.redirect('/');
	});
});

app.get('/login', function (req, res, next) {
	res.sendFile(__dirname + '/public/views/login.html')
});

app.post('/login', function (req, res) {
	var userData = req.body;

	db.User.authenticate(userData, function (err, user) {
		if(err === 1) {
			res.sendFile(__dirname + '/public/views/error.html');
		} else if (err === 2) {
			res.sendFile(__dirname + '/public/views/error.html');
		} else {
		req.login(user);
		res.redirect('/profile');
		}
	});
});

app.get('/logout', function (req, res, next) {
	req.logout();
	res.redirect('/');
});

//API
app.get('/v1/me', function(req, res) {
	req.currentUser(function (err, user) {
		if (user) {
			res.send(user);
		} else {
			res.send(null);
		}
	});
});

app.get('/v1/users/:userId', function (req, res) {
	db.User.findOne({_id: req.params.userId}, function (err, foundUser) {
		res.send(foundUser);
	});
});

app.put('/v1/users/:userId', function (req, res) {
	db.User.findOne({_id: req.params.userId}, function (err, foundUser) {
		foundUser.myResults.push({
			trackNameResult: req.body.trackNameResult,
			artistNameResult: req.body.artistNameResult,
			albumArt: req.body.albumArt,
			venueName: req.body.venueName,
			venueCat: req.body.venueCat,
			venueLat: req.body.venueLat,
			venueLng: req.body.venueLng,
			venueAddressA: req.body.venueAddressA,
			venueAddressB: req.body.venueAddressB,
			venueRating: req.body.venueRating,
			venueURL: req.body.venueURL
		});

		foundUser.save(function (err, savedUser) {
			res.json(savedUser);
		});
	});
});

//SEARCH ROUTE FOR MAPPING ALGORITHM
app.get('/v1/search/:inputA/:inputB', function (req, res) {
	Map.map(req.params.inputA, req.params.inputB, function (query) {
		res.send(query);
	});
});

//DATA VALIDATION
app.get('/v1/users/find/userName/:userName', function (req, res) {
	db.User.findOne({userName: req.params.userName}, function (err, foundUser) {
		if(foundUser) {
			res.json(foundUser.userName)
		} else {
			res.json('');
		}
	});
});
app.get('/v1/users/find/email/:email', function (req, res) {
	db.User.findOne({email: req.params.email}, function (err, foundUser) {
		if(foundUser) {
			res.json(foundUser.email)
		} else {
			res.json('');
		}
	});
});

app.get('/v1/secrets', function (req, res) {
	var x = process.env.ECHO_NEST_API_KEY;
	res.send(x);
})

app.listen(process.env.PORT || 3000);