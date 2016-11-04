module.exports = function(opts){
	var time = opts.time || 100;

	return function(req, res, next){
		var timer = setTimeout(function(){
			console.log(
				'\033[90m%s %s\033[39m \033[91mis taking too long!\033[39m',
				req.method,
				req.url
			);
		}, time),
			end = res.end; // 保持对原始函数的引用

		// 重写方法
		res.end = function(chunk, encoding){
			res.end = end; // 恢复原始函数

			res.end(chunk, encoding);
			clearTimeout(timer);
		};

		next();
	};
};