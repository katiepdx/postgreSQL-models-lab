/* eslint-disable keyword-spacing */
const pool = require('../pool.js');

class Phone {
    id;
    name;
    brand;
    cost;

    constructor(tableRow) {
        this.id = tableRow.id;
        this.name = tableRow.name;
        this.brand = tableRow.brand;
        this.cost = tableRow.cost;
    }

    static async insert(addPhone) {
        const { rows } = await pool.query(
            'INSERT INTO phones (name, brand, cost) VALUES ($1, $2, $3) RETURNING *', [addPhone.name, addPhone.brand, addPhone.cost]);
        return new Phone(rows[0]);
    }
}

module.exports = Phone;
