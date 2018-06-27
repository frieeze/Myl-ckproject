const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const shell = require('shelljs');

var app = express();

// Port Number
const port = 8080;
const host = '0.0.0.0';

// Body Parser Middleware
app.use(bodyParser.json());

// Index Route
app.get('/', (req, res) => {
	res.sendStatus(403);
	res.send('Invalid Endpoint');
});

router.post('/cast', (req, res, next) => {
	const address = req.body.url;
	shell.exec('catt cast'+address);
});

router.post('/add', (req, res, next) => {
	const address = req.body.url;
	shell.exec('catt add'+address);
});

router.post('/pause', (req, res, next) => {
	shell.exec('catt pause');
});

router.post('/play', (req, res, next) => {
	shell.exec('catt play');
});

router.post('/skip', (req, res, next) => {
	shell.exec('catt skip');
});

router.post('/stop', (req, res, next) => {
	shell.exec('catt stop');
});

// Start Server
app.listen(port, host, () => {
    console.log('Server started on '+host+':'+port)
;})
