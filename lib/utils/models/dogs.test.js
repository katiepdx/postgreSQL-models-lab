/* eslint-disable space-before-function-paren */
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

    it('tests that a new dog is added to the database', async () => {
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

    it('gets a dog by id from the database', async () => {
        // create a dog
        const newDog = await Dog.insert({
            name: 'Clifford',
            breed: 'Husky',
            age: 6
        });

        const searchedForDog = await Dog.findById(newDog.id);

        // expect searchedForDog to equal newDog object 
        expect(searchedForDog).toEqual({
            id: newDog.id,
            name: 'Clifford',
            breed: 'Husky',
            age: 6
        });
    });

    it('gets all dogs from the database', async () => {
        // add dogs to database - wrap all in a promise.all
        await Promise.all([
            Dog.insert({
                name: 'Ben',
                breed: 'Poodle',
                age: 4
            }),
            Dog.insert({
                name: 'Clifford',
                breed: 'Husky',
                age: 6
            }),
            Dog.insert({
                name: 'Cookie',
                breed: 'Pug',
                age: 4
            })

        ]);

        const allDogs = await Dog.findAllDogs();

        // expect allDogs to be an array of dogs CONTAINING the following, order doesn't matter.  
        expect(allDogs).toEqual(expect.arrayContaining([
            {
                id: expect.any(Number),
                name: 'Ben',
                breed: 'Poodle',
                age: 4
            }, {
                id: expect.any(Number),
                name: 'Clifford',
                breed: 'Husky',
                age: 6
            }, {
                id: expect.any(Number),
                name: 'Cookie',
                breed: 'Pug',
                age: 4
            }
        ]));
    });

    it('updates a dog row (object) by id in database', async () => {
        // create a dog (to be updated later)
        const dog = await Dog.insert({
            name: 'Clifford',
            breed: 'Husky',
            age: 6
        });

        // update a dog by id
        const updatedDog = await Dog.updateDogById(dog.id, {
            name: 'Clifford',
            breed: 'Husky',
            age: 7
        });

        // expect updatedDog to equal the updated dog object 
        expect(updatedDog).toEqual({
            id: dog.id,
            name: 'Clifford',
            breed: 'Husky',
            age: 7
        });
    });

    it('deletes one dog by id from the database', async () => {
        // create a test dog for database
        const dog = await Dog.insert({
            name: 'Connor',
            breed: 'Sheltie',
            age: 12
        });

        // delete dog by id using dog example id
        const deleteDog = await Dog.deleteById(dog.id);

        // deletedById returns the deleted row for confirmation
        // expect deletedDog to equal this object
        expect(deleteDog).toEqual({
            id: dog.id,
            name: 'Connor',
            breed: 'Sheltie',
            age: 12
        });
    });

});
