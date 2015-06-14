// pkd modules
var Router = require('./router');
var handlers = require('./handlers');

// Create router and route handlers
var router = new Router();

// Routes

/* SIGN UP */ router.add('POST//signup/:email/:password', handlers.signup);
/* SIGN IN */ router.add('PUT//signin/:username/:password', handlers.signin);

module.exports = router;