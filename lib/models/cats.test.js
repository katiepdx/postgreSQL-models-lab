/* eslint-disable space-before-function-paren */
const fs = require('fs');
const Cat = require('./cats.js');
const pool = require('../utils/pool.js');

describe('Cat model', () => {
    // run before each test
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

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

    it('gets a cat by id from the database', async () => {
        const newCat = await Cat.insert({
            name: 'Flower',
            breed: 'American Shorthair',
            age: 5
        });

        const searchedForCat = await Cat.findById(newCat.id);

        expect(searchedForCat).toEqual({
            id: newCat.id,
            name: 'Flower',
            breed: 'American Shorthair',
            age: 5
        });
    });

    it('tests that null is returned if findById catId does not exist in database', async () => {
        const doesNotExistCat = await Cat.findById(564);

        expect(doesNotExistCat).toEqual(null);
    });

    it('gets all cats from the database', async () => {
        // add all cats to DB and wrap all in a promise.all
        await Promise.all([
            Cat.insert({
                name: 'Flower',
                breed: 'American Shorthair',
                age: 5
            }),
            Cat.insert({
                name: 'Shelly',
                breed: 'Scottish Fold',
                age: 1
            }),
            Cat.insert({
                name: 'Nova',
                breed: 'Bengal',
                age: 7
            })

        ]);

        const allCats = await Cat.findAllCats();

        // Cat array - order doesn't matter 
        expect(allCats).toEqual(expect.arrayContaining([
            {
                id: expect.any(Number),
                name: 'Flower',
                breed: 'American Shorthair',
                age: 5
            }, {
                id: expect.any(Number),
                name: 'Shelly',
                breed: 'Scottish Fold',
                age: 1
            }, {
                id: expect.any(Number),
                name: 'Nova',
                breed: 'Bengal',
                age: 7
            }
        ]));
    });

    it('updates a cat row (object) by id in database', async () => {
        const cat = await Cat.insert({
            name: 'Nova',
            breed: 'Bengal',
            age: 7
        });

        const updatedCat = await Cat.updateCatById(cat.id, {
            name: 'Nova',
            breed: 'Bengal',
            age: 8
        });

        expect(updatedCat).toEqual({
            id: cat.id,
            name: 'Nova',
            breed: 'Bengal',
            age: 8
        });
    });

    it('deletes one cat by id from the database', async () => {
        const cat = await Cat.insert({
            name: 'Nova',
            breed: 'Bengal',
            age: 7
        });

        const deleteCat = await Cat.deleteById(cat.id);

        expect(deleteCat).toEqual({
            id: cat.id,
            name: 'Nova',
            breed: 'Bengal',
            age: 7
        });
    });
});
