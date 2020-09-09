/* eslint-disable keyword-spacing */
const pool = require('../pool.js');

class Computer {
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

    static async insert(addComputer) {
        const { rows } = await pool.query(
            'INSERT INTO computers (name, brand, cost) VALUES ($1, $2, $3) RETURNING *', [addComputer.name, addComputer.brand, addComputer.cost]);
        return new Computer(rows[0]);
    }

    static async findById(computerId) {
        const { rows } = await pool.query(
            'SELECT * FROM computers WHERE id=$1', [computerId]
        );

        if (!rows[0]) {
            return null;
        } else {
            return new Computer(rows[0]);
        }
    }

    static async findAllComputers() {
        const { rows } = await pool.query(
            'SELECT * FROM computers'
        );

        const allComputers = rows.map((row) => {
            return new Computer(row);
        });
        return allComputers;
    }
}

module.exports = Computer;

