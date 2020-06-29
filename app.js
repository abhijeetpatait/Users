let finalHandler = require('finalhandler');
let http = require('http');
let Router = require('router');
let bodyParser = require('body-parser');

// internal routes
let user = require('./controllers/users/router');

// router definitions
let router = new Router();
router.use(bodyParser.json());
// router.get('/', function(req, res){
//     res.setHeader('Content-Type', 'text/plain; charset=utf-8');
//     res.end('i am the first router call here');
// });
router.use('/users', user);

// create server calls
let server = http.createServer(function(req, res) {
    router(req, res, finalHandler(req, res));
});

server.listen(process.env.PORT || 3000);

module.exports = server;