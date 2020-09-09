/* eslint-disable space-before-function-paren */
const fs = require('fs');
const Phone = require('./phones.js');
const pool = require('../pool.js');


describe('Phone model', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    // Create
    it('tests that a new phone is added to the database', async () => {
        const newPhone = await Phone.insert({
            name: 'IPhone 64gb',
            brand: 'Apple',
            cost: '$749.00'
        });

        const { rows } = await pool.query('SELECT * FROM phones WHERE id=$1', [newPhone.id]);

        expect(rows[0]).toEqual({
            id: newPhone.id,
            name: 'IPhone 64gb',
            brand: 'Apple',
            cost: '$749.00'
        });
    });
});

