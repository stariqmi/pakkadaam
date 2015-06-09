// Node modules
var http = require('http');

// pkd modules
var router = require('./router');


// Create HTTP server
var server = http.createServer(function(req, res) {

	var route = req.method + '/' + req.url;
	console.log('Request received for ' + route);
	router.exec(route, req, res);

});

// Listen on port 3000
server.listen(3000);
