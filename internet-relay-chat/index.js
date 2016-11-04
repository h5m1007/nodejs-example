var net = require('net'),
	client = net.connect(3000, 'localhost');

client.on('connect', function(){
	client.setEncoding('utf-8');
	client.write('NICK mynick\r\n');
	client.write('USER mynick 0 * : realname\r\n');
	client.write('JOIN #node.js\r\n');
});