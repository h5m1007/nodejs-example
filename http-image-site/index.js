var http = require('http'),
	fs = require('fs'),
	server = http.createServer(function(req, res){
		if ('GET' == req.method &&
			'/images' == req.url.substr(0, 7) &&
			'.jpg' == req.url.substr(-4)){
			fs.stat(__dirname + req.url, function(err, stat){
				if (err || !stat.isFile()) {
					// 文件发送错误
					// 路径上的文件并非文件类型
					res.writeHead(404);
					res.end('Not Found');
					return;
				}
				serve(__dirname + req.url, 'application/jpg');
			});
		} else if ('GET' == req.method && '/' == req.url){
			serve(__dirname + '/index.html', 'text/html');
		} else {
			res.writeHead(404);
			res.end('Not Found');
		}

		function serve(path, type){
			// 向服务器发送内容
			res.writeHead(200, {
				"Content-Type": type
			});

			// 文件系统流接到(pipe)HTTP响应流中
			fs.createReadStream(path).pipe(res);

			/********等价于********/
			// fs.createReadStream(path)
			// 	.on('data', function(data){
			// 		res.write(data);
			// 	})
			// 	.on('end', function(){
			// 		res.end();
			// 	});
		}
	});

server.listen(8080);