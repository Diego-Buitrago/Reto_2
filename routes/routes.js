const { Router } = require('express');
const router = Router();
const fs = require('fs');

const songsFile = fs.readFileSync("./songs.json", "utf8");
let songs = JSON.parse(songsFile);

router.get("/", (req, res) => {
    res.json("Bienvenido a mi API");
});

router.get("/songs", (req, res) => {
    res.status(200).json(songs);
});

router.post("/songs", (req, res) => {

    const { title, artist, year, duration, genre } = req.body;

    if (!title || !artist || !year || !duration || !genre) {
        res.status(401).json({ error: "Por favor, diligencie todos los datos" });
    } else {

        const id = songs.length + 1;


        let newSong = {
            id,
            title,
            artist,
            year,
            duration,
            genre
        };

        songs.push(newSong);
        const json_songs = JSON.stringify(songs);

        fs.writeFileSync("./songs.json", json_songs, "utf-8");

        res.status(200).json(songs);

    }
});

router.put("/songs/:id", (req, res) => {

    const { title, artist, year, duration, genre } = req.body;
    const id = req.params.id;

    if (!title || !artist || !year || !duration || !genre || !id) {
        res.status(401).json({ error: "Debe completar los datos y especificar el id." });
    } else {

        songs.filter((song) => {

            if (song.id == id) {
                song.title = title;
                song.artist = artist;
                song.year = year;
                song.duration = duration;
                song.genre = genre;
            }
        });


        const json_songs = JSON.stringify(songs);
        fs.writeFileSync("./songs.json", json_songs, "utf-8");

        res.status(200).json(songs);


    }



});


router.delete("/songs/:id", (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(401).json({ error: "Especifique un id" });
    } else {
        const indexSong = songs.findIndex((song) => song.id === id);
        songs.splice(indexSong, 1);

        const json_songs = JSON.stringify(songs);
        fs.writeFileSync("./songs.json", json_songs, "utf-8");

        res.status(200).json(songs);

    }

});

module.exports = router;