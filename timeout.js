// setTimeout(function(){
//   console.log("World");
// }, 0);

// console.log("hello");

// console.log("Bye");

// var now = new Date().getTime();
// while(new Date().getTime() < now + 1000){

// }
// console.log("timeout 阻塞服务器1秒钟");

/*
	timer0和timer1属于同一级事件轮询
	timer0 --> timer1 --> timer2
*/
// setTimeout(function(){
// 	console.log("timer0");
// 	setTimeout(function(){
// 		console.log("timer2");
// 	}, 0);
// }, 0);

// setTimeout(function(){
//   console.log("timer1");
// }, 0);

/*
	process.nextTick(func)
	把原本应在第二次事件轮询的timer2
	放到了第一次事件轮询上
	因此 timer0 --> timer2 --> timer1
*/
// process.nextTick(function A(){
// 	console.log("timer0");
// 	process.nextTick(function B(){
// 		console.log("timer2");
// 	});
// });

// setTimeout(function(){
//   console.log("timer1");
// }, 0);

/*
	setImmediate(func)
	把事件注册到下一次事件轮询上
	因此 timer0 --> timer1 --> timer2
*/
setImmediate(function(){
	setImmediate(function A(){
		console.log("timer0");
		setImmediate(function B(){
			console.log("timer3");
			setImmediate(function C(){
				console.log("timer4");
			});
		});
	});

	setTimeout(function timeout(){
		console.log("timer1");
	}, 0);

	setTimeout(function timeout(){
		console.log("timer2");
	}, 0);
});
