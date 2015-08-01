var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
	mongoose = require('mongoose'),
	session = require('express-session'),
	request = require('request');

// Inport Models
var db = require('./models/models');
var Map = require('./models/map-update');

//regex for queries with ampersand
function replaceString (inputString) {
	var re = /\&/;
	return inputString.replace(re, '%26');
}

mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/sound-bites-two');

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
			res.send('user not found');
		} else if (err === 2) {
			res.send('password does not match');
		} else {
		req.login(user);
		res.send({redirect: '/profile'});
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

app.delete('/v1/users/:userId/:resultId', function (req, res) {
	db.User.findByIdAndUpdate(
		req.params.userId,
		{
			$pull: {
				myResults: {_id: req.params.resultId}
			}
		},
		function (err, result){
			res.send(result);
		}
	);

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

//PROXIES for external APIs
app.get('/v1/proxy/echo/primary/:artistName/:trackName', function (req, res) {
	request('https://developer.echonest.com/api/v4/song/search?api_key=' + 'DGY3JGAZP1OFZR4RO' + '&format=json&results=6&artist=' + replaceString(req.params.artistName) + '&title=' + replaceString(req.params.trackName), function (error, response, body) {
  		res.send(body);
	});
});

app.get('/v1/proxy/echo/secondary/:artistName', function (req, res) {
	request('https://developer.echonest.com/api/v4/artist/terms?api_key=' + 'DGY3JGAZP1OFZR4RO' + '&name=' + replaceString(req.params.artistName) + '&format=json', function (error, response, body) {
  		res.send(body);
	});
});

app.get('/v1/proxy/foursquare/primary/:queryVal/:lat/:lng', function (req, res) {
	request('https://api.foursquare.com/v2/venues/explore?client_id=' + 'J3QA1RADSXWM43QI0VTSC1EFFCFFZYKPZW2Z2PNVL5YEWU5T' + '&client_secret=' + 'TRR5QY22ZJWTTGWRXQ50MQIFXC0VHOLC2F3EPG2YRBMIFIXP' + '&v=20130815%20&ll=' + req.params.lat + ',' + req.params.lng + '&llAcc=10000.0&radius=5000&limit=10&query=' + req.params.queryVal, function (error, response, body) {
  		res.send(body);
	});
});

app.listen(process.env.PORT || 3000);