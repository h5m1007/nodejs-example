var connect = require('connect'),
	fs = require('fs'),
	server = connect.createServer();

// server.use(
// 	connect.static(__dirname)
// );

server.use(
	connect.logger(
        'type is :res[content-type], ' +
        'length is :res[content-length] ' +
        'and it took :response-time ms.'
    )
);

server.use(function(req, res, next){
	// 记录日志
	console.error(' %s %s ', req.method, req.url);

	// 交给其它中间件处理
	next();
});

server.use(function(req, res, next){
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
			serve(res, __dirname + req.url, 'application/jpg');
		});
	} else {
		next();
	}
});

server.use(function(req, res, next){
	if ('GET' == req.method && '/' == req.url){
		serve(res, __dirname + '/index.html', 'text/html');
	} else {
		next();
	}
});

server.use(function(req, res, next){
	res.writeHead(404);
	res.end('Not Found');
});

function serve(res, path, type){
	// 向服务器发送内容
	res.writeHead(200, {
		"Content-Type": type
	});

	// 文件系统流接到(pipe)HTTP响应流中
	fs.createReadStream(path).pipe(res);
}

server.listen(8080);