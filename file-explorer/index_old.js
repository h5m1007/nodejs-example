var fs = require('fs');

fs.readdir(process.cwd(), function(err, files){
	// process.cwd()  返回当前进程工作目录
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
	};

	console.log('	Select which file or directory you want to see\n');

	function file(i){
		var filename = files[i];

		// fs.stat返回文件或目录的元数据
		// 元数据描述数据的信息，即数据的属性等特性
		fs.stat(__dirname + '/' + filename, function(err, stat){
			if(stat.isDirectory()){
				// 判断stat对象是否为目录
				console.log('	' + i + '	\033[36m' + filename + '/\033[39m');
			}else{
				console.log('	' + i + '	\033[90m' + filename + '\033[39m');
			}

			i++;

			if(i == files.length){
				// 数组下标等于数组长度
				// 停止递归
				console.log(''); // 空一行
				process.stdout.write('	\033[33mEnter your choice: \033[39m');
				process.stdin.resume(); // 保持输入状态
				process.stdin.setEncoding('utf8');
			}else{
				file(i); // 递归 i=i+1
			}
		});
	};

	file(0);
});