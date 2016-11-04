var express = require('express'),
	wsio = require('websocket.io'),
	app = express.createServer(),

	// 将websocket.io绑定在express
	// 这样就可以处理websocket请求
	ws = wsio.attach(app);

	app.use(express.static(__dirname));
	
	ws.on('connection', function(socket){
		socket.on('message', function(msg){
			console.log(' \033[96mgot:\033[39m ' + msg);
			socket.send('pong');
		});
	});

app.listen(8080);



