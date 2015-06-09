// pkd modules
var Router = require('./router');
var handlers = require('./handlers');

// Create router and route handlers
var router = new Router();

// Routes

// Signup
router.add('POST//signup/:email/:password', handlers.signup);

module.exports = router;