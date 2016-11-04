var connect = require('connect'),
	time = require('./request-time'),
	server = connect.createServer();

server.use(
	// 记录请求情况
	connect.logger('dev')
	// connect.logger(
 //        'type is :res[content-type], ' +
 //        'length is :res[content-length] ' +
 //        'and it took :response-time ms.'
 //    )
);

server.use(
	// 实现中间件
	time({
		time: 500
	})
);

// 实现快速响应
server.use(function(req, res, next){
	if('/a' == req.url){
		res.writeHead(200);
		res.end('Fast!');
	} else {
		next();
	}
});

// 模拟慢速响应
server.use(function(req, res, next){
	if('/b' == req.url){
		setTimeout(function(){
			res.writeHead(200);
			res.end('Slow!');
		}, 1000);
	} else {
		next();
	}
});

server.listen(8080);