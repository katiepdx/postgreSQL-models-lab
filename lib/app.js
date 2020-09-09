/* eslint-disable space-before-function-paren */
const express = require('express');
const app = express();
const Phone = require('../lib/models/phones.js');

app.use(express.json());

// POST route
app.post('/api/phones', async (req, res, next) => {
    try {
        const addedPhone = await Phone.insert(req.body);
        res.send(addedPhone);
    } catch (error) {
        next(error);
    }
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
