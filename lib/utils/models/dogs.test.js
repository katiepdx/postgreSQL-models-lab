// file system imports 
const fs = require('fs');
// class import 
const Dog = require('./dogs.js');
// pool import 
const pool = require('../pool.js');

describe('Dog model', () => {
    // run this before each test
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    it('tests that a new dog is added to the database', async() => {
        const newDog = await Dog.insert({
            name: 'Ben',
            breed: 'Poodle',
            age: 4
        });

        // get the added newDog row from database
        const { rows } = await pool.query('SELECT * FROM dogs WHERE id = $1', [newDog.id]);

        // expect newDog (added to db row) to equal rows (from database)
        expect(rows[0]).toEqual(newDog);
    });

});
