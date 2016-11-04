var request = require('superagent');

// module.exports = function search (query, fn){
// 	request
// 		.get('http://baike.baidu.com/api/openapi/BaikeLemmaCardApi')
// 		.send({
// 			scope: 103,
// 			format: 'json',
// 			appid: '379020',
// 			bk_key: query
// 		})
// 		.end(function(res){
// 			if(res.body && Array.isArray(res.body.card)){
// 				return fn(null, res.body.card); // 返回给results
// 			}

// 			// 实例化一个新的中间件对象
// 			fn(new Error('Bad baidu baike response'));
// 		});
// }

exports.search = function (err, req, res, next){

	request
		.get('http://baike.baidu.com/api/openapi/BaikeLemmaCardApi')
		.send({
			scope: 103,
			format: 'json',
			appid: '379020',
			bk_key: req.query.q
		})
		.end(function(res){
			if(res.body && Array.isArray(res.body.card)){
				return res.body.card; // 返回给results
			}

			// 实例化一个新的中间件对象
			new Error('Bad baidu baike response');
		});


	if(err){
		return next(err);
	}

	res.render(
		'search',
		{
			// 传递变量到search.ejs视图
			// 这类变量称作本地变量
			// 因只对其传递视图可见
			results: res.body.card,
			search: req.query.q
		}
	);
}