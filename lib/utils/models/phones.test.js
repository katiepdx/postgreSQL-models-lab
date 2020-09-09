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
            name: 'IPhone 11 64gb',
            brand: 'Apple',
            cost: '$749.00'
        });

        const { rows } = await pool.query('SELECT * FROM phones WHERE id=$1', [newPhone.id]);

        expect(rows[0]).toEqual({
            id: newPhone.id,
            name: 'IPhone 11 64gb',
            brand: 'Apple',
            cost: '$749.00'
        });
    });

    it('gets a phone by id from the database', async () => {
        const newPhone = await Phone.insert({
            name: 'IPhone 11 Pro 64gb',
            brand: 'Apple',
            cost: '$999.00'
        });

        const searchedForPhone = await Phone.findById(newPhone.id);

        expect(searchedForPhone).toEqual({
            id: newPhone.id,
            name: 'IPhone 11 Pro 64gb',
            brand: 'Apple',
            cost: '$999.00'
        });
    });

    it('tests that null is returned if findById phoneId does not exist in database', async () => {
        const doesNotExistPhone = await Phone.findById(512);

        expect(doesNotExistPhone).toEqual(null);
    });
});

