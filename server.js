const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const [ notes ] = require('./data/notes.json');


//ROUTES
//API Routes
app.get('/api/notes', (req, res) => {
    res.json(notes)
})

//POST /api/notes to receive new note to save on the body


//HTML Routes
//GET * to return index.html
//GET /notes to return notes.html


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});