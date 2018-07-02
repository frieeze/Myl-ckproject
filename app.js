const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const shell = require('shelljs');

var app = express();

// Port Number
const port = 8080;
const host = '0.0.0.0';

//Set interface folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Index Route
app.get('/', (req, res) => {
	res.sendStatus(404);
});

app.post('/cast', (req, res, next) => {
	console.log('Cast !');
	const address = req.body.url;
	shell.exec('catt cast'+address);
});

app.post('/add', (req, res, next) => {
	console.log('Add !');
	const address = req.body.url;
	shell.exec('catt add'+address);
});

app.post('/pause', (req, res, next) => {
	console.log('Pause !');
	shell.exec('catt pause');
});

app.post('/play', (req, res, next) => {
	console.log('Play !');
	shell.exec('catt play');
});

app.post('/skip', (req, res, next) => {
	console.log('Skip !');
	shell.exec('catt skip');
});

app.post('/stop', (req, res, next) => {
	console.log('Stop !');
	shell.exec('catt stop');
});

app.post('/volup', (req, res, next) => {
	console.log('Volume up !');
	shell.exec('amixer sset Master 5%+')
	shell.exec('catt volumedown 15');
});

app.post('/voldown', (req, res, next) => {
	console.log('Volume down !');
	shell.exec('amixer -D pulse sset Master 5%-')
	shell.exec('catt volumeup 15');
});

// Start Server
app.listen(port, host, () => {
    console.log('Server started on '+host+':'+port)
;})
