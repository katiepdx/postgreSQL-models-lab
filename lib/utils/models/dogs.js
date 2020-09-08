// pool import 
const pool = require('../pool.js');

class Dog {
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

    // INSERT new dog row into database 
    // Must add RETURNING * to get { rows }
    static async insert(addDog) {
        const { rows } = await pool.query(
            'INSERT INTO dogs (name, breed, age) VALUES ($1, $2, $3) RETURNING *', [addDog.name, addDog.breed, addDog.age]);
        console.log(rows[0]);
        return new Dog(rows[0]);
    }
}

module.exports = Dog;
