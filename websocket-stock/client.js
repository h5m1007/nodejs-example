(function(){
	var ws = new WebSocket("ws://localhost:8080"),
		stock_req = {
			"stocks": [
				"tencent",
				"alibaba",
				"baidu",
				"xiaomi",
				"huawei"
			]
		},
		isClose = false, // 连接关闭标识
		stocks = {
			// 初始化每只股票的价格
			"tencent": 0,
			"alibaba": 0,
			"baidu": 0,
			"xiaomi": 0,
			"huawei": 0
		};

		function updataUI(){

			ws.addEventListener('open', function(e){

				// 连接上了后台输出
				console.log("Connection to server opened!");

				// 关闭连接标识设为false
				isClose = false;

				// 因websocket只接受字符串传输
				// 把json格式的请求对象
				// 转换成字符串
				ws.send(JSON.stringify(stock_req));

				console.log("send a msg!");
			});

			function changeStockPrice(item, oldVal, newVal){
				var elemVal = document.querySelector('#' + item +' h3');

				elemVal.innerHTML = newVal.toFixed(2); // 四舍五入至小数点后两位

				// console.log(newVal, oldVal);

				if(newVal < oldVal){
					elemVal.style.color = "green";
				} else {
					elemVal.style.color = "red";
				}
			}

			ws.addEventListener('message', function(e){
				// 把接收来自服务器的数据
				// 转换成JSON格式
				var stocksData = JSON.parse(e.data);

				console.log(stocksData);

				for(var item in stocksData){
					if(stocksData.hasOwnProperty(item)){
						changeStockPrice(item, stocks[item], stocksData[item]);
						stocks[item] = stocksData[item];
					}
				}
			});
		}

		updataUI();

		var startBtn = document.getElementsByClassName('btn_start')[0],
			stopBtn = document.getElementsByClassName('btn_stop')[0];

		startBtn.addEventListener('click', function(){
			if(isClose){
				// 当前连接关闭的话
				// 再次实例化websocket对象给ws
				ws = new WebSocket("ws://localhost:8080");
			}
			updataUI();
		});

		stopBtn.addEventListener('click', function(){
			// 手动关闭连接
			ws.close();
		});

		ws.addEventListener('close', function(e){
			console.log("Connection closed!", e);
			isClose = true;
		});
})()