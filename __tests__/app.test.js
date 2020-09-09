/* eslint-disable space-before-function-paren */
const fs = require('fs');
const pool = require('../lib/utils/pool.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Phone = require('../lib/models/phones.js');
const { report } = require('../lib/app.js');

describe('Phones routes', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    it('creates a new phone using the POST route', async () => {
        // wait for response from our app
        const response = await request(app)
            .post('/api/phones')
            .send({
                name: 'Samsung Note 20 Ultra 512gb',
                brand: 'Samsung',
                cost: '$1,449.99'
            });

        expect(response.body).toEqual({
            id: expect.any(Number),
            name: 'Samsung Note 20 Ultra 512gb',
            brand: 'Samsung',
            cost: '$1,449.99'
        });
    });

    it.skip('updates an existing phone by id using the PUT route', async () => {
        // Create a new phone (to update later)
        const newPhone = await Phone.insert({
            name: 'Samsung Note 20 Ultra 512gb',
            brand: 'Samsung',
            cost: '$1,449.99'
        });

        const response = await request(app)
            .put(`/api/phones/${newPhone.id}`)
            .send({
                name: 'Samsung Note 20 Ultra 512gb',
                brand: 'Samsung',
                cost: '$1,000.99'
            });

        expect(response.body).toEqual({
            id: newPhone.id,
            name: 'Samsung Note 20 Ultra 512gb',
            brand: 'Samsung',
            cost: '$1,000.99'
        });
    });

    it('deletes an existing phone by id using the DELETE route', async () => {
        // Create a new phone (to delete later)
        const newPhone = await Phone.insert({
            name: 'Samsung Note 20 Ultra 512gb',
            brand: 'Samsung',
            cost: '$1,449.99'
        });

        const response = await request(app)
            .delete(`/api/phones/${newPhone.id}`);

        expect(response.body).toEqual({
            id: newPhone.id,
            name: 'Samsung Note 20 Ultra 512gb',
            brand: 'Samsung',
            cost: '$1,449.99'
        });
    });

    it('gets an existing phone by id using the GET route', async () => {
        // Create a new phone (to get later)
        const newPhone = await Phone.insert({
            name: 'Samsung Note 20 Ultra 512gb',
            brand: 'Samsung',
            cost: '$1,449.99'
        });

        const response = await request(app)
            .get(`/api/phones/${newPhone.id}`);

        expect(response.body).toEqual({
            id: newPhone.id,
            name: 'Samsung Note 20 Ultra 512gb',
            brand: 'Samsung',
            cost: '$1,449.99'
        });
    });
});
