const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

const routes = require('./prove01-routes.js');

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	// const body = JSON.stringify(req.body, null, 2);
	const body = JSON.stringify(req.body);
	console.log(`[${req.method}] ${req.url}\nBody:\n${body}`);
	next();
});

app.use(routes);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});