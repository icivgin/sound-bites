var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	bcrypt = require('bcrypt'),
  	salt = bcrypt.genSaltSync(10);

var ResultSchema = new Schema({
	trackNameResult: String,
	artistNameResult: String,
	albumArt: String,
	venueName: String,
	venueCat: String,
	venueLat: Number,
	venueLng: Number,
	venueAddressA: String,
	venueAddressB: String,
	venueRating: String,
	venueURL: String
});

var UserSchema = new Schema ({
	userName: String,
	passwordDigest: String,
	myResults: [ResultSchema]
});

UserSchema.statics.createSecure = function (newUser, callback) {
	var that = this;

	bcrypt.genSalt(function (err, salt) {
		bcrypt.hash(newUser.password, salt, function (err, hash) {

			that.create({
				userName: newUser.userName,
				passwordDigest: hash
			}, callback);

			});
		});
};

UserSchema.statics.authenticate = function (userData, callback) {
	this.findOne({ userName: userData.userName }, function (err, user) {
		// throw error if can't find user
	    if (!user) {
	      callback(1, 'user not found');

	    // if found user, check if password is correct
	    } else if (user.checkPassword(userData.password)) {
	      callback(null, user);
	    } else {
	    	callback(2, 'password does not match');
	    }
	});
};

UserSchema.methods.checkPassword = function(password) {
	return bcrypt.compareSync(password, this.passwordDigest);
}

var User = mongoose.model('User', UserSchema);
var Result = mongoose.model('Result', ResultSchema);

module.exports.User = User;
module.exports.Result = Result;
