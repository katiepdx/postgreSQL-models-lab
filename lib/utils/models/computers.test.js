/* eslint-disable space-before-function-paren */
const fs = require('fs');
const Computer = require('./computers.js');
const pool = require('../pool.js');

describe('Computer model', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    // Create
    it('tests that a new computer is added to the database', async () => {
        const newComputer = await Computer.insert({
            name: 'MacBook Pro 13',
            brand: 'Apple',
            cost: '$1,299.00'
        });

        const { rows } = await pool.query('SELECT * FROM computers WHERE id=$1', [newComputer.id]);

        expect(rows[0]).toEqual({
            id: newComputer.id,
            name: 'MacBook Pro 13',
            brand: 'Apple',
            cost: '$1,299.00'
        });
    });

});

