// npm modules
var randstr = require('randomstring');
var request = require('request');
var Q = require('q');

// conf files
var conf = require('./conf.json');

// pkd modules
var NodeCouch = require('../couch-db');

var CouchDB = new NodeCouch({host: conf.couch_host, port: conf.couch_port});

module.exports.signup = signup;
function signup(req, res, route, params) {

	var self = this;

	CouchDB.queryView("users", "users", "by_email", {key: '"' + params.email + '"'})
	.then(function(data) {
		
		// If no user exists with concerned email
		var result = JSON.parse(data.response);
		if (result.rows.length === 0) {
		
			// Create a random username, also used as _id in CouchDB for document
			var username = "pkd_" + randstr.generate(7);
			var cookie = randstr.generate(10);

			// Doc to be created
			var user = {
				"email": params.email,
				"password": params.password
			};

			CouchDB.createDoc("users", username, user)
			.then(function(data) {
				if (data.error) res.end(JSON.stringify({status: "FAILED", message: "Error when creating new user"}));
				else res.end(JSON.stringify({status: "SUCCESS", message: "User created successfully", username: username}))
			});
		
		}
		// User by email already exists
		else {
			res.end(JSON.stringify({status: "FAILED", message: "User by email " + params.email + " already exists"}));
		}
	});
	
}