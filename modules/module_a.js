// console.log('this is a');

// exports是对module.exports的引用
exports.name = 'john';
exports.data = 'this is some data';

var privateVariable = 5;

exports.getPrivate = function(){
	return privateVariable;
};