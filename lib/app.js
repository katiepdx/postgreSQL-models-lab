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

// PUT route
app.put('/api/phones/:id', async (req, res, next) => {
    try {
        const updatedPhone = await Phone.updatePhoneById(req.params.id);
        console.log('UDPATED PHONE', updatedPhone);
        res.send(updatedPhone);

    } catch (error) {
        next(error);
    }
});

// DELETE route
app.delete('/api/phones/:id', async (req, res, next) => {
    try {
        const deletedPhone = await Phone.deleteById(req.params.id);
        res.send(deletedPhone);

    } catch (error) {
        next(error);
    }
});

// GET by id route
app.get('/api/phones/:id', async (req, res, next) => {
    try {
        const foundPhone = await Phone.findById(req.params.id);
        res.send(foundPhone);

    } catch (error) {
        next(error);
    }
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
