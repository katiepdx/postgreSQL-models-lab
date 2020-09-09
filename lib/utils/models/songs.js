/* eslint-disable keyword-spacing */
const pool = require('../pool.js');

class Song {
    id;
    name;
    singer;
    producer;
    album;

    constructor(tableRow) {
        this.id = tableRow.id;
        this.name = tableRow.name;
        this.singer = tableRow.singer;
        this.producer = tableRow.producer;
        this.album = tableRow.album;
    }

    static async insert(addSong) {
        const { rows } = await pool.query(
            'INSERT INTO songs (name, singer, producer, album) VALUES ($1, $2, $3, $4) RETURNING *', [addSong.name, addSong.singer, addSong.producer, addSong.album]);
        return new Song(rows[0]);
    }

    static async findById(songId) {
        const { rows } = await pool.query(
            'SELECT * FROM songs WHERE id=$1', [songId]
        );

        if (!rows[0]) {
            return null;
        } else {
            return new Song(rows[0]);
        }
    }

    static async findAllSongs() {
        const { rows } = await pool.query(
            'SELECT * FROM songs'
        );

        const allSongs = rows.map((row) => {
            return new Song(row);
        });
        return allSongs;
    }

    static async updateSongById(songId, song) {
        const { rows } = await pool.query(
            'UPDATE songs SET name=$1, singer=$2, producer=$3, album=$4 WHERE id=$5 RETURNING *', [song.name, song.singer, song.producer, song.album, songId]
        );

        return new Song(rows[0]);
    }
}

module.exports = Song;
