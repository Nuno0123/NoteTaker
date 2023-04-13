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

   







app.listen(POST, () => {
    console.log("Server Running...");
})