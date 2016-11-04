// require('http').createServer(function(req, res){
// 	res.writeHead(200, {
// 		'Content-Type': 'image/png'
// 	});

// 	var stream = require('fs').createReadStream('image.png');

// 	stream.on('data', function(data){
		// 对接口
// 		res.write(data);
// 	});

// 	stream.on('end', function(){
		// 对接口
// 		res.end();
// 	});
// }).listen(8080);

require('http').createServer(function(req, res){
	res.writeHead(200, {
		'Content-Type': 'image/png'
	});

	require('fs').createReadStream('image.png').pipe(res);
}).listen(8080);