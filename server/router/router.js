// npm modules
var routes = require('routes');

module.exports = Router;

function Router(opts) {
	var self = this;

	self.router = routes();
}

Router.prototype.add = function(route, handler) {
	var self = this;
	self.router.addRoute(route, handler);

	return self;
};

Router.prototype.exec = function(route, req, res) {
	var self = this;

	var match = self.router.match(route);
	match.fn.apply(self, [req, res, match.route, match.params]);

	return self;
};
