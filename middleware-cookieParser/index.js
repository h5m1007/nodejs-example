var connect = require('connect');

var app = connect(
	connect.logger('dev'),
	connect.cookieParser('secert string'),
	function(req, res, next){
		req.cookies.website = 'blog.fens.me';
		res.end(JSON.stringify(req.cookies));
	}
);

app.listen(8080);