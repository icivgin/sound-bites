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

app.get('/', function (req, res, next) {
	res.sendFile(__dirname + '/public/views/index.html')
});

app.get('/signup', function (req, res, next) {
	res.sendFile(__dirname + '/public/views/signup.html')
});

app.post('/signup', function (req, res) {
	var newUser = req.body;
	console.log(newUser);

	User.createSecure(newUser, function (err, user) {
		res.sendFile(__dirname + '/public/views/index.html');
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
		// req.login(user);
		res.sendFile(__dirname + '/public/views/test.html');
		}
	});
});

app.listen(process.env.PORT || 3000);