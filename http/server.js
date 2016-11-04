require('http').createServer(function(req, res){

	console.log(req.headers);

	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	
	res.write('Hello ');

	setTimeout(function(){
		res.end('<b>World</b>');
	}, 500);

}).listen(8080);

// GET / HTTP/1.1