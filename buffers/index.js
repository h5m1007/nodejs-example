var fs = require('fs'),
	mybuffer = new Buffer('==ii1j2i3h1i23h', 'base64');

console.log(mybuffer);

fs.writeFile('logo.png', mybuffer);