/* eslint-disable space-before-function-paren */
const fs = require('fs');
const pool = require('../lib/utils/pool.js');
const request = require('supertest');
const app = require('../lib/app.js');

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
});
