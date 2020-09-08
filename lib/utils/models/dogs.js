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
        return new Dog(rows[0]);
    }

    // find a dog by id using SELECT
    static async findById(dogId) {
        const { rows } = await pool.query(
            'SELECT * FROM dogs WHERE id = $1', [dogId]
        );

        // edge case - id doesn't exist
        if(!rows[0]) {
            return null;
        } else {
            return new Dog(rows[0]);
        }
    }

    // find ALL dogs in dogs table 
    static async findAllDogs() {
        const { rows } = await pool.query(
            'SELECT * FROM dogs'
        );
        // map through the array of rows and create a new Dog for each row
        const allDogs = rows.map((row) => {
            return new Dog(row);
        });
        return allDogs;
    }

    // update a dog row in the database 
    static async updateDogById(dogId, dog) {
        const { rows } = await pool.query(
            'UPDATE dogs SET name=$1, breed=$2, age=$3 WHERE id=$4 RETURNING *', [dog.name, dog.breed, dog.age, dogId]
        );
        return new Dog(rows[0]);
    }

    // deletes a dog by id and returns the deleted row
    static async deleteById(dogId) {
        const { rows } = await pool.query(
            'DELETE FROM dogs WHERE id=$1 RETURNING *', [dogId]
        );
        return new Dog(rows[0]);
    }

}

module.exports = Dog;
