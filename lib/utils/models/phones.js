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

    static async findById(phoneId) {
        const { rows } = await pool.query(
            'SELECT * FROM phones WHERE id=$1', [phoneId]
        );

        if (!rows[0]) {
            return null;
        } else {
            return new Phone(rows[0]);
        }
    }

    static async findAllPhones() {
        const { rows } = await pool.query(
            'SELECT * FROM phones'
        );

        const allPhones = rows.map((row) => {
            return new Phone(row);
        });
        return allPhones;
    }
}

module.exports = Phone;
