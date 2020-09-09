/* eslint-disable space-before-function-paren */
const fs = require('fs');
const Song = require('./songs.js');
const pool = require('../pool.js');

describe('Song model', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    // Create
    it('tests that a new song is added to the database', async () => {
        const newSong = await Song.insert({
            name: 'Hello',
            singer: 'Adele',
            producer: '‎Greg Kurstin',
            album: '25'
        });

        const { rows } = await pool.query('SELECT * FROM songs WHERE id=$1', [newSong.id]);

        expect(rows[0]).toEqual({
            id: newSong.id,
            name: 'Hello',
            singer: 'Adele',
            producer: '‎Greg Kurstin',
            album: '25'
        });
    });

    // Read
    it('gets a song by id from the database', async () => {
        const newSong = await Song.insert({
            name: 'Hello',
            singer: 'Adele',
            producer: '‎Greg Kurstin',
            album: '25'
        });

        const searchedForSong = await Song.findById(newSong.id);

        expect(searchedForSong).toEqual({
            id: newSong.id,
            name: 'Hello',
            singer: 'Adele',
            producer: '‎Greg Kurstin',
            album: '25'
        });
    });

    it('tests that null is returned if findById songId does not exist in database', async () => {
        const doesNotExistSong = await Song.findById(6);

        expect(doesNotExistSong).toEqual(null);
    });


});

