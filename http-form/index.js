var http = require('http'),
	qs = require('querystring'); // 可将字符串解析成对象

http.createServer(function(req, res){
	if('/' == req.url){
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});

		res.end([
			'<form action="/url" method="POST">',
			'<h1>My form</h1>',
			'<fieldset>',
			'<label>Personal information</label>',
			'<p>What is your name?</p>',
			'<input type="text" name="name"/>',
			'<p><button>Submit</button></p>',
			'</form>'
		].join(''));
	}else if('/url' == req.url && 'POST' == req.method){
		// res.writeHead(200, {
		// 	'Content-Type': 'text/html'
		// });

		// res.end('You sent a <em>' + req.method + '</em> request');

		var body = '';

		req.on('data', function(chunk){
			// 监视请求数据变化
			// 数据已数据块分块存储
			// 并分块发送
			body += chunk;
		});

		req.on('end', function(){
			// end事件被触发
			// 即数据已接收完全
			res.writeHead(200, {
				'Content-Type': 'text/html'
			});

			// res.end('<p>Content-Type: ' + req.headers['content-type'] + '</p>'
			// 	+ '<p>Data:</p><pre>' + body + '</pre>');

			// querystring.parse(str)  解析字符串为对象
			res.end('<p>your name is <b>' + qs.parse(body).name + '</b></p>');
		});
	}else{
		res.writeHead(400);
		res.end('Not Found');
	}
}).listen(8080);