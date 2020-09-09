/* eslint-disable space-before-function-paren */
const fs = require('fs');
const Song = require('./songs.js');
const pool = require('../utils/pool.js');

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

    it('gets all the songs from the database', async () => {
        await Promise.all([
            Song.insert({
                name: 'Hello',
                singer: 'Adele',
                producer: '‎Greg Kurstin',
                album: '25'
            }),
            Song.insert({
                name: 'Million Years Ago',
                singer: 'Adele',
                producer: '‎Greg Kurstin',
                album: '25'
            }),
            Song.insert({
                name: 'Send My Love (To Your New Lover)',
                singer: 'Adele',
                producer: '‎Max Martin, Shellback',
                album: '25'
            })

        ]);

        const allSongs = await Song.findAllSongs();

        expect(allSongs).toEqual(expect.arrayContaining([
            {
                id: expect.any(Number),
                name: 'Hello',
                singer: 'Adele',
                producer: '‎Greg Kurstin',
                album: '25'
            }, {
                id: expect.any(Number),
                name: 'Million Years Ago',
                singer: 'Adele',
                producer: '‎Greg Kurstin',
                album: '25'
            }, {
                id: expect.any(Number),
                name: 'Send My Love (To Your New Lover)',
                singer: 'Adele',
                producer: '‎Max Martin, Shellback',
                album: '25'
            }
        ]));
    });

    // Update
    it('updates a song row (object) by id in database', async () => {
        const song = await Song.insert({
            name: 'Send My Love (To Your New Lover)',
            singer: 'Adele',
            producer: '‎Max Martin, Shellback',
            album: '21'
        });

        const updatedSong = await Song.updateSongById(song.id, {
            name: 'Send My Love (To Your New Lover)',
            singer: 'Adele',
            producer: '‎Max Martin, Shellback',
            album: '25'
        });

        expect(updatedSong).toEqual({
            id: song.id,
            name: 'Send My Love (To Your New Lover)',
            singer: 'Adele',
            producer: '‎Max Martin, Shellback',
            album: '25'
        });
    });

    // Delete
    it('deletes one song by id from the database', async () => {
        const song = await Song.insert({
            name: 'Send My Love (To Your New Lover)',
            singer: 'Adele',
            producer: '‎Max Martin, Shellback',
            album: '25'
        });

        const deleteSong = await Song.deleteById(song.id);

        expect(deleteSong).toEqual({
            id: song.id,
            name: 'Send My Love (To Your New Lover)',
            singer: 'Adele',
            producer: '‎Max Martin, Shellback',
            album: '25'
        });
    });
});

