var connect = require('connect'),
	fs = require('fs'),
	server = connect(
		connect.static('static'),
		connect.bodyParser(),
		connect.logger('dev'),
		function(req, res, next){
			// if('POST' == req.method){
			// 	console.log(req.files);
			// } else {
			// 	next();
			// }
			if('POST' == req.method && req.files){
				fs.readFile(req.files.file.path, 'utf8', function(err, data){
					if(err){
						res.writeHead(500);
						res.end('Error!');
						return;
					}

					res.writeHead(200, {
						'Content-Type': 'text/html'
					});

					res.end([
						'<h3>File: ' + req.files.file.name + '</h3>',
						'<h4>File: ' + req.files.file.type + '</h4>',
						'<h4>Contents:</h4><pre>' + data + '</pre>'
					].join(''));
				});
			} else {
				next();
			}
		}).listen(8080);

// server.use(connect.static('static'))
// 	.use(connect.bodyParser())
// 	.use(connect.logger())
// 	.use(function(req, res, next){
// 		if('POST' == req.method){
// 			console.log(req.files);
// 		} else {
// 			next();
// 		}
// 	});

// server.listen(8080);