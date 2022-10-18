const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { notes } = require('./data/notes.json');


//ROUTES
//API Routes
app.get('/api/notes', (req, res) => {
    res.json(notes)
})

//POST /api/notes to receive new note to save on the body
app.post('/api/notes', (req, res) => {
    //set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    //validate
    if(!validateNote(req.body)){
        res.status(400).send('The note is not properly formatted.')
    } else {
        //add note to json file and notes array
        const note = createNewNote(req.body, notes);

        res.json(note)
    }    
});

//HTML Routes
//GET * to return index.html
//GET /notes to return notes.html

//FUNCTIONS
function createNewNote(body, notesArray){
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return note;
   
}

function validateNote(note){
    if(!note.title || typeof note.title !== 'string'){
        return false;
    }
    if(!note.text || typeof note.text !== 'string'){
        return false;
    }
}
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});