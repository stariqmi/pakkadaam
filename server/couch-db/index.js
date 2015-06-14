// npm modules
var request = require('request');
var Q = require('q');

// node modules
var qs = require('qs');


module.exports = NodeCouch;


function NodeCouch(opts) {
	var self = this;

	// self.couch = opts.host + ":" + opts.port;
	self.couch = opts.hosting;
}

NodeCouch.prototype.queryView = function(db, designDoc, view, query, cb) {
	var self = this;
	var defer = Q.defer();

	var req_url = self.couch + "/" + db + "/_design/" + designDoc + "/_view/" + view + "?" + qs.stringify(query);
	
	request( req_url, genericReqHandler(cb, defer) );

	return defer.promise;
};

NodeCouch.prototype.createDoc = function(db, id, doc, cb) {

	var self = this;
	var defer = Q.defer();

	request(
		{
			method: "PUT",
			uri: self.couch + "/" + db + "/" + id,
			json: true,
			body: doc
		},
		genericReqHandler(cb, defer)
	);

	return defer.promise;

}

function genericReqHandler(cb, defer) {
	return function(error, response, body) {	
		if (typeof cb === "function") {
			cb(error, body);
		}
		defer.resolve({error: error, response: body});
	}
}