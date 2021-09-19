const express = require('express');
const fs = require('fs');
const path = require('path')

const router = express.Router();

const dir = path.join(__dirname, './');
const usersFile = dir + '/users.json';

function getUsers() {
	const usersRaw = fs.readFileSync(usersFile, 'utf8');
	return JSON.parse(usersRaw);
}

function addUser(user) {
	const users = getUsers();
	users.push(user);
	fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

router.get('/', (req, res, next) => {
	return res.sendFile('index.html', { root: dir });
});

router.get('/users', (req, res, next) => {
	console.log('request to users');
	const users = getUsers();

	res.write('<html>');
	res.write('<head><title>Users!</title></head>');
	res.write('<body>');

	res.write('<h1>Current Users</h1>');

	res.write('<ul>');

	users.map((user) => {
		res.write(`<li>${user.last_name}, ${user.first_name} - ${user.email}</li>`);
	});

	res.write('</ul>');

	res.write('<div><a href="/">Click here to add new user</a></div>');

	res.write('</body>');
	res.write('</html>');

	return res.end();
});

router.post('/create-user', (req, res, next) => {
	if (req.body.first_name === undefined || req.body.first_name.length <= 0) {
		res.write('<html>');
		res.write('<head><title>Users!</title></head>');
		res.write('<body>');
		res.write('No username given!');
		res.write('<div><a href="/">Click here to add a user</a></div>');
		res.write('</body>');
		res.write('</html>');
		return res.end();
	} else {
		addUser({
			first_name: req.body.first_name,
			last_name : req.body.last_name,
			email     : req.body.email,
		});
		res.redirect('/users');
		next();
		// res.write(`${req.body.username} added to the users list. <a href="/users">click here</a> to view them.`);
	}
});

module.exports = router;
