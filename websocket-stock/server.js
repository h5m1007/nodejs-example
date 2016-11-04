var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({
		port: 8080
	}),
	stocks = {
		"tencent": 95.00,
		"alibaba": 103.00,
		"baidu": 95.00,
		"xiaomi": 50.00,
		"huawei": 113.00
	},
	stockUpdater,
	clientStocks = [];

// 用于随机数生成
function randomInterval(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// 用于随机数更新
function randomStockUpdater(){
	for (var item in stocks){
		if(stocks.hasOwnProperty(item)){
			// 使用随机数生成函数
			// 为股价数值生成随机增量
			var randomizedChange = randomInterval(-150, 150),
				floatChange = randomizedChange / 100; // 取小数点后两位

			stocks[item] += floatChange;
		}
	}

	var randomMSTime = randomInterval(500, 2500);

	stockUpdater = setTimeout(function(){
		// 在生成的随机时间后更新股价数值
		randomStockUpdater();
	}, randomMSTime);
}

randomStockUpdater();

wss.on('connection', function(ws){

	function sendStockUpdates (ws) {
		// 封装响应信息
		if(ws.readyState == 1){
			// 已建立连接可发送消息
			var stocksObj = {}; // 保存每次更新后的股票信息

			for (var i = 0; i < clientStocks.length; i++) {
				// clientStocks 为包含股票名的数组
				var item = clientStocks[i];

				// 为每只股票赋数值
				stocksObj[item] = stocks[item];
			}

			if(stocksObj.length !== 0){
				// 把更新后的股票信息
				// 作为响应发回客户端
				ws.send(JSON.stringify(stocksObj));

				console.log("股票已更新：", JSON.stringify(stocksObj));
			}
		}
	}

	var clientStockUpdater = setInterval(function(){
		// 每一秒刷新股票信息
		sendStockUpdates(ws);
	}, 1000);

	ws.on('message', function(msg){
		// 接收客户端发来的请求
		// 一个包含股票名的JSON字符串
		var stockReq = JSON.parse(msg); // 把字符串转成JSON对象

		console.log("收到客户端信息：", stockReq);

		clientStocks = stockReq['stocks']; // 获取JSON对象中键为'stocks'的值
		sendStockUpdates(ws);
	});

	ws.on('close', function(){
		if(typeof clientStockUpdater !== 'undefined'){
			clearInterval(clientStockUpdater);
		}
	});
});