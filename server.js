var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res, next) {
	res.sendFile(__dirname + '/public/views/index.html')
});


app.listen(process.env.PORT || 3000);