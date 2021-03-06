var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var todos = require('./routes/todos');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Middleware
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.use('/', index);
app.use('/api/v1', todos);

// 
app.locals.refreshUrl=process.env.BROWSER_REFRESH_URL;

// Server
app.listen(3000, function(){
	console.log('server started on port 3000...');

	if (process.send) {
		process.send('online');
	}
})