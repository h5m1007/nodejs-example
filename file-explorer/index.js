// 重构代码

var fs = require('fs'),
	stats = [],
	stdin = process.stdin,
	stdout = process.stdout;

fs.readdir(process.cwd(), function(err, files){
	// process.cwd()  获取当前执行文件的工作目录即运行时的目录
	// files包含指定目录下所有文件名称的数组

	/**
	* stream流
	* 1. stdin  输入流即可读流 默认状态暂停
	* 2. stdout  输出流即可写流
	*	如 console.log输出指定字符串且其后加上(\n) 并写入stdout流
	*	而 process.stdout.write直接输出字符串且不过行 同一行继续输出
	* 3. stderr  错误流即可写流
	*/

	console.log(''); // 输出空行

	if(!files.length){
		return console.log('	\033[31m No files to show!\033[39m\n');
	}

	console.log('	Select which file or directory you want to see\n');

	function file(i){
		var filename = files[i];

		// fs.stat返回文件或目录的元数据
		// 元数据描述数据的信息，即数据的属性等特性
		fs.stat(__dirname + '/' + filename, function(err, stat){
			// __dirname  获取当前执行文件所在的目录
			stats[i] = stat; // stat对象值保存至全局
			if(stat.isDirectory()){
				// 判断stat对象是否为目录
				console.log('	' + i + '	\033[36m' + filename + '/\033[39m');
			}else{
				console.log('	' + i + '	\033[90m' + filename + '\033[39m');
			}

			
			if(++i == files.length){
				// 数组下标等于数组长度
				// 停止递归
				read();
			}else{
				file(i); // 递归 i=i+1
			}
		});
	}

	function read(){
		console.log(''); // 空一行
		stdout.write('	\033[33mEnter your choice: \033[39m');
		stdin.resume(); // 保持输入状态
		stdin.setEncoding('utf8');
		stdin.on('data', option); // 监听data事件
	}

	function option(data){
		// data 来自终端的输入
		var filename = files[Number(data)];
		if(!filename){
			stdout.write('	\033[31mEnter your choice: \033[39m');
		}else{
			stdin.pause(); // 暂停输入状态

			if(stats[Number(data)].isDirectory()){
				fs.readdir(__dirname + '/' + filename, function(err, files){
					console.log('');
					console.log('	(' + files.length + ' files)');
					files.forEach(function(file){
						console.log('	-  ' + file);
					});
				});
			}else{
				fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data){
					console.log('');
					console.log('\033[90m' + data.replace(/(.*)/g, '	$1') + '\033[39m');
				});
			}
		}
	}

	file(0);
});