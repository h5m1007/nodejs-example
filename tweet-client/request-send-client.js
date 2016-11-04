var http = require('http'),
	qs = require('querystring');

function send(theName){
	/**
	 * http.request将创建并返回
	 * 一个http.ClientRequest对象
	 * 即一个http.ClientRequest实例
	 * 它表示一个正进行的请求
	 */
	http.request({
		host: '127.0.0.1',
		port: 8080,
		url: '/',
		method: 'POST'
	},function(res){
		// res http.ClientResponse实例
		res.setEncoding('utf8');
		res.on('data', function(){
			console.log('\n \033[90m request complete!\033[39m');
			process.stdout.write('\n your name: ');
		});
	}).end(qs.stringify({
		// 请求数据就绪
		// 对应服务器对req监听end事件
		// qs.stringify可将对象转为url编码过的数据
		// 向服务器发出请求
		// 数据编译成 "name=theName"
		name: theName
	}));
}

process.stdout.write('\n your name: ');
process.stdin.resume(); // 保持输入状态
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(name){
	// console.log(name);
	send(name.replace('\n', '')); // 
});

