var http = require('http'),
	qs = require('querystring'),
	search = process.argv.slice(2).join(' ').trim();

if(!search.length){
	return console.log('\n Usage: node tweets <search term>\n');
}

console.log('\n searching for: \033[96m' + search + '\033[39m\n');

// http.request({
// 	host: 'baike.baidu.com',
// 	path: '/api/openapi/BaikeLemmaCardApi?' + 
// 		'scope=103&format=json&appid=379020&' +
// 		qs.stringify({ bk_key: search }) + '&bk_length=600',
// }, function(res){
// 	var body = '';
// 	res.setEncoding('utf8');
// 	res.on('data', function(chunk){
// 		body += chunk;
// 	});
// 	res.on('end', function(){
// 		var obj = JSON.parse(body);
// 		// console.log(obj.abstract);

// 		obj.card.forEach(function(card){
// 			console.log('	\033[90m' + card.name + '\033[39m');
// 			console.log('	\033[94m' + card.value + '\033[39m');
// 			console.log('--');
// 		});
// 	});
// }).end();

/*************等价于 使用http.get()*************/

http.get({
	host: 'baike.baidu.com',
	path: '/api/openapi/BaikeLemmaCardApi?' + 
		'scope=103&format=json&appid=379020&' +
		qs.stringify({ bk_key: search }) + '&bk_length=600'
}, function(res){
	var body = '';
	res.setEncoding('utf8');
	res.on('data', function(chunk){
		body += chunk;
	});
	res.on('end', function(){
		var obj = JSON.parse(body);
		// console.log(obj.abstract);

		obj.card.forEach(function(card){
			console.log('	\033[90m' + card.name + '\033[39m');
			console.log('	\033[94m' + card.value + '\033[39m');
			console.log('--');
		});
	});
}); // 使用.get() 此处省略了.end()

