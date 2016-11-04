var http = require('http'), // 引入http模块
	fs = require('fs'), // 引入文件读取模块
	documentRoot = 'C:\/Users\/Administrator\/Desktop\/PHP和MySQL.Web开发 源代码\/code', // 需要访问的文件存放目录
	server = http.createServer(function(req, res){
		/*
			req用来接受客户端数据
			res用来向客户端发送服务器数据
		*/

		// 客户端输入的url，如localhostL:80/index.html
		// 那么url == /index.html
		var url = req.url,
			file = documentRoot + url; //组合路径，指向资源目录
		console.log(file);

		fs.readFile(file, function(err, data){
			if(err){
				res.writeHeader(404, {
					'content-type': 'text/html;charset="utf-8"'
				});
				res.write('<h1>404 error</h1><p>所访问的页面不存在</p>');
				res.end();
			}else{
				res.writeHeader(200, {
					'content-type': 'text/html;charset="utf-8"'
				});

				// 将file指向目录路径下的文件
				// 显示在客户端
				res.write(data);
				res.end();
			}
		});
	}).listen(8080);

console.log('服务器开启成功');
