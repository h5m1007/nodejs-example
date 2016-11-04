/**
 * 创建TCP服务器
 * 无须任何协议或指令即可访问
 */

var net = require('net'),
	count = 0, // 连接数(状态)
	users = {},
	server = net.createServer(function(conn){
		// 每次有新连接建立
		// 都会执行一次回调
		console.log('\033[90m  new connection!\033[39m');
		// console.log(conn);

		// createServer的回调接收的一个参数
		// conn即net.Stream流对象可读也可写
		conn.setEncoding('utf8');
		conn.write(
			'\n > welcome to \033[92mnode-chat\033[39m!' +
			'\n > ' + count + ' other people are connected at this time.' +
			'\n > please write your name and press enter: '
		);

		count++;

		var nickname; // 表示当前连接昵称

		function broadcast(msg, exceptMyself){
			// 消息广播
			for(var i in users){
				if(!exceptMyself || i != nickname){
					// i != nickname
					// 用来确保聊天信息
					// 只发送给除自己外的其它客户端
					users[i].write(msg);
				}
			}
		}

		conn.on('data', function(data){
			// 删除换行符回车符
			data = data.replace(/[\r\n]/, '');
			// console.log(data);

			// 接收的第一份数据应为用户输入昵称
			if(!nickname){
				// 验证nickname第一次输入
				if(users[data]){
					// 如果nickname已存在
					/*
					 * 用户输入的数据data
					 * 将保存到users状态对象的键
					 * 而users对象键的值为conn
					 */
					conn.write('\033[93m> nickname already in use. try again:\033[39m');
					return;
				}else{
					// 如果nickname不存在
					nickname = data;
					users[nickname] = conn;

					// for(var i in users){
					// 	users[i].write('\033[90m > ' + nickname + ' joined the room\033[39m\n');
					// }

					broadcast('\033[90m > ' + nickname + ' joined the room\033[39m\n');
				}
			} else{
				// nickname验证通过后第二次输入
				// 聊天信息
				broadcast('\033[96m > ' + nickname + ':\033[39m ' + data + '\n', true);
			}
		});

		conn.on('close', function(){
			count--;
			delete users[nickname];
			broadcast('\033[90m > ' + nickname + ' left the room\033[39m\n');
		});
	});

server.listen(8080, function(){
	console.log('\033[96m  server listening on *:8080\033[39m');
});