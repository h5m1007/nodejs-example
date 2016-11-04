// var EventEmitter = require('events').EventEmitter,
// 	a = new EventEmitter;

// a.on('event', function(){
// 	// 为事件event注册侦听器
// 	console.log('event called');
// });

// a.emit('event'); // 手动触发事件event

/*************添加至自建类上*************/

var EventEmitter = process.EventEmitter,
	MyClass = function(){}; // 声明个函数模拟类

// __proto__让MyClass的Func继承EventEmitter所有方法和属性
MyClass.prototype.__proto__ = EventEmitter.prototype;

var a = new MyClass;

a.on('event', function(){
	// 为事件event注册侦听器
	console.log('event called');
});

a.emit('event'); // 手动触发事件event