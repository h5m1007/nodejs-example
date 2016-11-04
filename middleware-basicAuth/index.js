var connect = require('connect');

process.stdin.resume();
process.stdin.setEncoding('ascii');

connect(
	connect.basicAuth(function(user, pass, fn){
		// 实现客户端基本身份验证
		process.stdout.write('Allow user \033[96m' +
			user +
			'\033[39m ' +
			'with pass \033[90m' +
			pass +
			'\03339m ? [y/n]: ');

		process.stdin.once('data', function(data){
			// .once 每个请求获取一次数据
			if(data[0] == 'y'){
				fn(null, {
					username: user
				});
			} else {
				fn(new Error('Unauthorized'));
			}
		});
	}),
	function(req, res){
		res.writeHead(200);
		res.end('Welcome to the protected area.' +
			req.remoteUser.username);
		console.log(req.remoteUser); // 返回{ username: 'xxx'}
	}
).listen(8080);