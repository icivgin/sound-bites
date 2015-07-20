var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	bcrypt = require('bcrypt'),
  	salt = bcrypt.genSaltSync(10);

var UserSchema = new Schema ({
	firstName: String,
	userName: String,
	email: { type: String, unique: true }, 
	passwordDigest: String,

});

UserSchema.statics.createSecure = function (newUser, callback) {
	var that = this;

	bcrypt.genSalt(function (err, salt) {
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			console.log(hash);

			that.create({
				firstName: newUser.firstName,
				userName: newUser.userName,
				email: newUser.email,
				passwordDigest: hash
			}, callback);

			});
		});
};

UserSchema.statics.authenticate = function (userData, callback) {
	console.log(userData);
	this.findOne({ userName: userData.userName }, function (err, user) {
		console.log(err);
		console.log(user);
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

module.exports = User;