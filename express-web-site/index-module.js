var express = require('express'),
	search_module = require('./search-module'),
	app = express.createServer();

app
	.set('view engine', 'ejs') // 指明模版引擎
	.set('views', __dirname + '/views') // 指明模版根目录
	.set('view options', {
		// 参数值传递每个模版
		layout: false
	})
	.set('view cache', true); // 对模版缓存

/**
 * 路由表
 * 配置路由处理器
 */
app.get('/', function(req, res){
	
	// 渲染index模版
	// 并作为响应返回
	res.render('index');
	// console.log(app.set('views'));
});

app.get(
	'/search',
	search_module.search
	// function(req, res, next){
	// 	search(req.query.q, function(err, baikes){
	// 		// req.query 获取地址栏传递的参数
	// 		if (err) {
	// 			// 调用search(qstr, fn)函数
	// 			// 经fn实例化的错误中间件
	// 			return next(err);
	// 		}
	// 		res.render(
	// 			'search',
	// 			{
	// 				// 传递变量到search.ejs视图
	// 				// 这类变量称作本地变量
	// 				// 因只对其传递视图可见
	// 				results: baikes,
	// 				search: req.query.q
	// 			}
	// 		);
	// 	});
	// }
);

/**
 * 配置错误处理器
 */
app.error(function(err, req, res, next){
	// 配置search(qstr, fn)函数
	// fn实例化的错误中间件参数
	if('Bad baidu baike response' == err.message){
		res.render(
			'error',
			{
				status: 500
			},
			function(err, html){
				// 第三参数
				// 可处理收到的html
			}
		);
	} else {
		next();
	}
});

app.listen(8080);