var request = require('superagent');

request
	.get('http://baike.baidu.com/api/openapi/BaikeLemmaCardApi')
	.send({
		scope: 103,
		format: 'json',
		appid: '379020',
		bk_key: '火影'
	})
	.set('Date', Date)
	.end(function(res){
		console.log(res.body);
	});
	

