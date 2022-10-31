const { application } = require('express');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

let accounts = [
    { id: 1, currency: 'RSD', balance: 1000, type: 'Savings', user: 'kaca' },
    { id: 2, currency: 'EUR', balance: 500, type: 'Expenditure', user: 'kaca' },
    { id: 3, currency: 'RSD', balance: 1000, type: 'Savings', user: 'dule' },
    { id: 4, currency: 'USD', balance: 1200, type: 'Expenditure', user: 'dule' },
    { id: 5, currency: 'EUR', balance: 670, type: 'Expenditure', user: 'kaca' },
    { id: 6, currency: 'EUR', balance: 120, type: 'Expenditure', user: 'kaca' },
    { id: 7, currency: 'RSD', balance: 65000, type: 'Savings', user: 'dule' },
    { id: 8, currency: 'USD', balance: 1200, type: 'Expenditure', user: 'dule' }
];

let history = [{
        id: 5,
        user: 'kaca',
        date: '2022-08-21',
        change: 100,
        category: 'Clothes',
        description: 'New t-shirt',
        isExpense: true
    },
    {
        id: 2,
        user: 'kaca',
        date: '2022-07-24',
        change: 500,
        category: 'Education',
        description: 'Student loan',
        isExpense: false
    },
    {
        id: 4,
        user: 'dule',
        date: '2022-08-20',
        change: 20,
        category: 'Entertainment',
        description: 'Netflix subscription',
        isExpense: true
    },
    {
        id: 7,
        user: 'dule',
        date: '2022-08-20',
        change: 100,
        category: 'Electronics',
        description: 'For new graphic card',
        isExpense: false
    }
];

let notes = [{ id: 1, date: '2022-04-21', text: 'Need to add 10% of salary next month.' },
    { id: 2, date: '2022-02-04', text: 'Going to spend some cash on theatre tickets.' },
    { id: 3, date: '2022-08-21', text: 'Add some cash from not going to gym this month.' },
    { id: 4, date: '2022-08-21', text: 'Urgent - buy new shoes.' }
]

var checkIfLoggedIn = (req, res, next) => {
    var token = req.get('X-AUTH-HEADER');
    var user = jwt.decode(token);
    if (user && user.user) {
        return next();
    }
    return res.status(403).json({ msg: 'Please login to access this information' });
};

router.get('/:user', (req, res) => {
    let user = req.params.user;
    if (user) {
        let foundAccounts = accounts.filter(
            (acc) => acc.user === user);
        return res.status(200).json(foundAccounts);
    }
    return res.status(400).json({ msg: 'Error. No accounts for user ' + user + ' found!' });
});

router.get('/notes/all', (req, res) => {
    let user = req.query['u'];
    if (user) {
        let foundAccounts = accounts.filter(
            (acc) => acc.user === user);
        let userNotes = [];
        for (acc of foundAccounts) {
            for (note of notes) {
                if (note.id === acc.id) {
                    userNotes.push(note);
                }
            }
        }
        return res.status(200).json(userNotes);
    }
    return res.status(400).json({ msg: 'Error. No accounts for user ' + user + ' found!' });
});


router.get('/history/get/all/h', (req, res) => {
    let user = req.query['u'];
    if (user) {

        let foundHistory = [];

        for (let i = 0; i < history.length; i++) {
            if (history[i].user == user) {
                foundHistory.push(history[i]);
            }
        }

        return res.status(200).json(foundHistory);
    }
    return res.status(400).json({ msg: 'Error. No history for ' + user + ' found!' });
});

router.post('/', (req, resp) => {
    let accountId = req.query['a'];
    let user = req.query['u'];
    if (accountId && user) {
        let balanceChange = req.body; // changeInfo
        let today = new Date().toISOString().slice(0, 10);
        let input = {
            id: accountId,
            user: user,
            date: today,
            change: balanceChange.change,
            category: balanceChange.category,
            description: balanceChange.description,
            isExpense: balanceChange.isExpense === 'true' ? true : false
        }

        history.push(input);
        for (let index = 0; index < accounts.length; index++) {
            if (accounts[index].id == accountId) {
                if (balanceChange.isExpense === 'true') {
                    accounts[index].balance -= balanceChange.change;
                } else {
                    accounts[index].balance += balanceChange.change;
                }
            }
        }
        resp.json(true);
    } else {
        resp.json(false);
    }
});

router.post('/notes/addNote', (req, resp) => {
    let data = req.body;
    let accountId = Object.values(data[0])[0];
    let date = Object.values(data[1])[0];
    let text = Object.values(data[2])[0];

    if (accountId !== 0) {
        let note = {
            id: accountId,
            date: date,
            text: text
        };
        notes.push(note);
        return resp.json('true');
    } else {
        return resp.json('false');
    }
});

router.put('/add', (req, resp) => {
    let acc = req.body;
    acc.id = Math.floor(Math.random() * Date.now());
    accounts.push(acc);

    return resp.status(200).json(true);
});

router.delete('/', (req, res) => {
    let id = req.query['a'];
    let size = accounts.length;
    accounts = accounts.filter(acc => acc.id != id);
    if (accounts.length < size) {
        return res.status(200).json(true);
    }
    return res.json(false);
});

module.exports = router;