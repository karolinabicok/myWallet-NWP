var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

const users = [
    { username: 'kaca', password: 'kaca', name: 'Karolina' },
    { username: 'dule', password: 'dule', name: 'Dusan' }
];

router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    let foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
        res.json({
            msg: 'Successfully logged in',
            token: jwt.sign({ user: username }, 'SECRET'),
            userFound: foundUser
        });

        return res;
    } else {
        res.status(400).json({ msg: 'Invalid username or password' });
        return res;
    }
});

router.post('/register', (req, res) => {
    var user = req.body;
    if (users.find(each => each.username === user.username)) {
        res.status(400).json({ msg: 'User with that username already exists.' });
    } else {
        users.push({ username: user.username, password: user.password, name: user.name });
        res.json({
            msg: 'Successfully created user, please login.'
        });
    }
});

module.exports = router;