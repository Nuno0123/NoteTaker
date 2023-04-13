const express = require('express');;
const fs = require('fs');
const path = require('path');

const app = express();
var POST = process.env.PORT || 3001;


// These two lines are PARSING the INCOMING REQUEST OBJECT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('*' , (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    // What logic do we need to do in our routes?
      fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error,notes) => {
      if (error) {
          return console.log(error)
      }
      res.json(JSON.parse(notes))
  })
});

app.post("/api/notes", (req, res) => {
    const currentNote = req.body;
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, notes) => {
      if (error) {
          return console.log(error)
      }
      notes = JSON.parse(notes)
      if (notes.length > 0) {
      let lastId = notes[notes.length - 1].id
      var id =  parseInt(lastId)+ 1
      } else {
        var id = 10;
      }
      let newNote = { 
        title: currentNote.title, 
        text: currentNote.text, 
        id: id 
        }
      var newNotesArr = notes.concat(newNote)
      fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(newNotesArr), (error, data) => {
        if (error) {
          return error
        }
        console.log(newNotesArr)
        res.json(newNotesArr);
      })
  });
 
});

app.delete("/api/notes/:id", (req, res) => {
    let deleteId = JSON.parse(req.params.id);
    console.log("ID to be deleted: " ,deleteId);
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error,notes) => {
      if (error) {
          return console.log(error)
      }
     let notesArray = JSON.parse(notes);
     for (var i=0; i<notesArray.length; i++){
       if(deleteId == notesArray[i].id) {
         notesArray.splice(i,1);
         fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(notesArray), (error, data) => {
          if (error) {
            return error
          }
          console.log(notesArray)
          res.json(notesArray);
        })
       }
    }
    
  }); 
  });

   







app.listen(POST, () => console.log(`App listening on PORT ${PORT}`));
