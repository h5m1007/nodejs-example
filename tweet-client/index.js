var http = require('http');

http.createServer(function(req, res){
	res.writeHead(200);

	res.end('Hello World'); // 发送响应数据
}).listen(8080);

// 调用http模块request静态方法
// 创建一个客户端来获取响应
http.request({
	host: '127.0.0.1',
	port: 8080,
	url: '/',
	method: 'GET'
}, function(res){
	var body = '';

	res.setEncoding('utf8');

	res.on('data', function(chunk){
		// 监听响应数据的变化
		// 以数据块形式
		// 存储至body并保存为字符串
		body += chunk;
	});

	res.on('end', function(){
		console.log('\n We got: \033[96m' + body + '\033[39m\n');
	});
}).end(); // 结束响应