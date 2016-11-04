function c(){
	b();
};

function b(){
	a();
};

function a(){
	try{
		setTimeout(function(){
			throw new Error('here');
		}, 10);
	}catch(e){
		console.log('捕获到错误！' + e);
	}
};

c();