let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let http = require('http');
var debug = require('debug')('server:server');
let io = require('socket.io');

let index = require('./routes/index');
let users = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// Get port from environment and store in Express.
let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

let server = http.createServer(app); // Create HTTP server.
// <socket.io area>
let $Socket = io(server);

require('./SocketIO/ng-auth-ng-admin')($Socket);
require('./SocketIO/ng-admin/category')($Socket);
require('./SocketIO/ng-admin/item')($Socket);

// </socket.io area>
server.listen(port); // Listen on provided port, on all network interfaces.
server.on('error', onError);
server.on('listening', onListening);
// ================================
function normalizePort(val) { // Normalize a port into a number, string, or false.
	var port = parseInt(val, 10);
	if (isNaN(port)) { return val; } // named pipe
	if (port >= 0) { return port; } // port number
	return false;
}
function onError(error) { // Event listener for HTTP server "error" event.
	if (error.syscall !== 'listen') { throw error; }
	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1); break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1); break;
		default:
			throw error;
	}
}
function onListening() { // Event listener for HTTP server "listening" event.
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	debug('Listening on ' + bind);
}
console.log('http://localhost:' + port);
