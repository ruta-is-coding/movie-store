const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let movies = [];


// Create a new movie
app.post('/movies', (req, res) => {
    const { title, productionDate, producer, rating } = req.body;
    const movie = { id: movies.length + 1, title, productionDate, producer, rating };
    movies.push(movie);
    res.status(201).send(movie);
});

// Get all movies
app.get('/movies', (req, res) => {
    res.status(200).send(movies);
});

// Get a movie by ID
app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
        return res.status(404).send('Movie not found');
    }
    res.status(200).send(movie);
});

// Update a movie by ID
app.put('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
        return res.status(404).send('Movie not found');
    }
    const { title, productionDate, producer, rating } = req.body;
    movie.title = title;
    movie.productionDate = productionDate;
    movie.producer = producer;
    movie.rating = rating;
    res.status(200).send(movie);
});

// Delete a movie by ID
app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    movies = movies.filter(item => item.id != id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});