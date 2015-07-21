var request = require('request');
var expect = require('chai').expect;
var cheerio = require('cheerio');

describe('localhost:3000', function() {

	// GET: api/posts/:id
	it('/v1/me should return null', function(done) {
		request.get('http://localhost:3000/v1/me', function(err, res, body) {
			expect(res.body).to.equal('');
			done();
		});
	});

	it('/v1/users/:userId should have matching ID', function(done) {
		request.get('http://localhost:3000/v1/users/55ad79852728a0e127e069e4', function(err, res, body) {
			var resParse = JSON.parse(body);
			// console.log(resParse);
			expect(resParse._id).to.equal('55ad79852728a0e127e069e4');
			done();
		});
	});

	it('/v1/users/:userId "PUT" should return matching ID', function(done) {
		request.get('http://localhost:3000/v1/users/55ad79852728a0e127e069e4', function(err, res, body) {
			var resParse = JSON.parse(body);
			expect(resParse._id).to.equal('55ad79852728a0e127e069e4');
			done();
		});
	});

	it('/v1/search/:inputA/:inputB should return food query', function(done) {
		request.get('http://localhost:3000/v1/search/pop/electronic', function(err, res, body) {
			console.log('search returns: ' + body);
			expect(body).to.exist;
			done();
		});
	});

});
