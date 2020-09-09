/* eslint-disable keyword-spacing */
const pool = require('../pool.js');

class Cat {
    id;
    name;
    breed;
    age;

    // new dog table row blueprint 
    constructor(tableRow) {
        this.id = tableRow.id;
        this.name = tableRow.name;
        this.breed = tableRow.breed;
        this.age = tableRow.age;
    }

    static async insert(addCat) {
        const { rows } = await pool.query(
            'INSERT INTO cats (name, breed, age) VALUES ($1, $2, $3) RETURNING *', [addCat.name, addCat.breed, addCat.age]);
        return new Cat(rows[0]);
    }

    static async findById(catId) {
        const { rows } = await pool.query(
            'SELECT * FROM cats WHERE id=$1', [catId]
        );

        if (!rows[0]) {
            return null;
        } else {
            return new Cat(rows[0]);
        }
    }

    static async findAllCats() {
        const { rows } = await pool.query(
            'SELECT * FROM cats'
        );

        return rows;
    }
}

module.exports = Cat;
