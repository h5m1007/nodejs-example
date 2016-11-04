var request = require('superagent');

module.exports = function search (query, fn){
	request
		.get('http://baike.baidu.com/api/openapi/BaikeLemmaCardApi')
		.send({
			scope: 103,
			format: 'json',
			appid: '379020',
			bk_key: query
		})
		.end(function(res){
			if(res.body && Array.isArray(res.body.card)){
				return fn(null, res.body.card); // 返回给results
			}

			// 实例化一个新的中间件对象
			fn(new Error('Bad baidu baike response'));
		});
}