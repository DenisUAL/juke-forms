const _ = require('lodash');
const net = require('net');

let telnetServer = net.createServer();

let connectionPool = [];

telnetServer.listen(8124);

telnetServer.on('connection', function(connection){
	console.log(connection);
	connection.write('Welcome');
	setInterval(function() {
		connection.write('Welcome. \n');
	}, Math.floor(Math.random() * 500))
});

// telnet ip 8124;