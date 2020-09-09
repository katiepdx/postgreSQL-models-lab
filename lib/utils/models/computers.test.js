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

    // Read
    it('gets a computer by id from the database', async () => {
        const newComputer = await Computer.insert({
            name: 'MacBook Pro 13',
            brand: 'Apple',
            cost: '$1,299.00'
        });

        const searchedForComputer = await Computer.findById(newComputer.id);

        expect(searchedForComputer).toEqual({
            id: newComputer.id,
            name: 'MacBook Pro 13',
            brand: 'Apple',
            cost: '$1,299.00'
        });
    });

    it('tests that null is returned if findById computerId does not exist in database', async () => {
        const doesNotExistComputer = await Computer.findById(6);

        expect(doesNotExistComputer).toEqual(null);
    });

    it('gets all the computers from the database', async () => {
        await Promise.all([
            Computer.insert({
                name: 'MacBook Pro 13',
                brand: 'Apple',
                cost: '$1,299.00'
            }),
            Computer.insert({
                name: 'MacBook Pro 13',
                brand: 'Apple',
                cost: '$1,649.00'
            }),
            Computer.insert({
                name: 'MacBook Pro 13',
                brand: 'Apple',
                cost: '$1,399.00'
            })

        ]);

        const allComputers = await Computer.findAllComputers();

        expect(allComputers).toEqual(expect.arrayContaining([
            {
                id: expect.any(Number),
                name: 'MacBook Pro 13',
                brand: 'Apple',
                cost: '$1,299.00'
            }, {
                id: expect.any(Number),
                name: 'MacBook Pro 13',
                brand: 'Apple',
                cost: '$1,649.00'
            }, {
                id: expect.any(Number),
                name: 'MacBook Pro 13',
                brand: 'Apple',
                cost: '$1,399.00'
            }
        ]));
    });

    // Update
    it('updates a computer row (object) by id in database', async () => {
        const computer = await Computer.insert({
            name: 'MacBook Pro 13',
            brand: 'Apple',
            cost: '$1,399.00'
        });

        const updatedComputer = await Computer.updateComputerById(computer.id, {
            name: 'MacBook Pro 13',
            brand: 'Apple',
            cost: '$999.00'
        });

        expect(updatedComputer).toEqual({
            id: computer.id,
            name: 'MacBook Pro 13',
            brand: 'Apple',
            cost: '$999.00'
        });
    });

    // Delete
    it('deletes one computer by id from the database', async () => {
        const computer = await Computer.insert({
            name: 'MacBook Pro 13',
            brand: 'Apple',
            cost: '$999.00'
        });

        const deleteComputer = await Computer.deleteById(computer.id);

        expect(deleteComputer).toEqual({
            id: computer.id,
            name: 'MacBook Pro 13',
            brand: 'Apple',
            cost: '$999.00'
        });
    });

});

