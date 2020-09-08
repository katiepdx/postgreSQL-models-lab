/* eslint-disable space-before-function-paren */
const fs = require('fs');
const Cat = require('./cats.js');
const pool = require('../pool.js');

describe('Cat model', () => {
    // run before each test
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    // C_rud
    it('tests that a new cat is added to the database', async () => {
        const newCat = await Cat.insert({
            name: 'Flower',
            breed: 'American Shorthair',
            age: 5
        });

        const { rows } = await pool.query('SELECT * FROM cats WHERE id=$1', [newCat.id]);

        expect(rows[0]).toEqual({
            id: newCat.id,
            name: 'Flower',
            breed: 'American Shorthair',
            age: 5
        });
    });
});
