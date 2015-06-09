// npm modules
var randstr = require('randomstring');

module.exports.signup = signup;
function signup(req, res, route, params) {

	var self = this;
	var redis = self.redis;

	redis.sismember("email_set", params.email, function(err, reply) {
		if (reply === 1) {
			res.end(JSON.stringify({status: 'FAILED', message: 'Email ' + params.email + 'already exists'}));
		} else {

			// Create a random username
			var username = "pkd_" + randstr.generate(7);
			var cookie = randstr.generate(10);

			// Create a new hash called <RANDOM_USERNAME>

			// WARNING - if a hash by <RANDOM_USERNAME> already exists, then the values will be over written, possible improvment
			
			redis.hmset(username, {
				"email": params.email,
				"password": params.password
			}, function(err, r) {
				// If hash was not created
				if (err) {
					res.end(JSDN.stringify({
						status: "FAILED",
						message: "Error in DB when creating user",
						error: err
					}));
				} 
				// If hash was successfully created
				else {
					redis.set(params.email, username); 		// key-value pair for email:username in case user forgets username, quick lookup
					redis.sadd("user_set", username);		// Add user to a set, quick lookup for username
					redis.sadd("email_set", params.email);	// Add email to a set, quick lookup for email - uniqueness

					res.end(JSON.stringify( {
						status: "SUCCESS",
						message: "User successfully created",
						username: username,
						cookie: cookie
					}));
				}
			});
		}
	});
}