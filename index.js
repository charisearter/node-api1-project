const express = require('express'); //bring in express
const shortid = require('shortid');//bring in shortid
const cors = require('cors'); //talk to frontend
const server = express(); //get server

//teach express how to read json from body

server.use(express.json());
server.use(cors());

//use let so it can be changed
//User array
let users = [
  {
    id: shortid.generate(),
    name: "Rick Sanchez",
    bio: "Rick C-137, Mad scientist to put it lightly."
  },
  {
    id: shortid.generate(),
    name: "Morty Smith",
    bio: "Adventures with Rick sometimes willingly and sometimes not."
  }
];

server.get('/', (req, res) => {
  res.send('<h1>It is working!</h1>');
});

//GET request for users (only array of users) WORKS

server.get('/api/users', (req, res) => {
  if(users) {
    res.status(200).json(users); //send user list 
  } else {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
  }
  
});

//GET request for users by id (specific user)

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const u = users.filter(u => u.id !== id);
  const thatOne = users.find(u => u.id === id); //find the user with specific id
  if(thatOne) {
    if(!thatOne) {
      res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }else{
        //if same id
    res.status(200).json(thatOne);
    }
  
  }else{
    //not found
    res.status(404).json({ message: "The user with the specified ID does not exist." });
  }
});

//POST users (add a user) WORKS
server.post('/api/users', (req, res) => {
  const newUser = req.body;
  newUser.id = shortid.generate();
  
  if(!newUser.name || !newUser.bio ) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user."  })
  }else{
    //if good
    users.push(newUser) ? res.status(201).json(newUser): res.status(500).json({ errorMessage: "There was an error while saving the user to the database" }) //send user list 
  }
  
});

//DELETE users 
server.delete('/api/users/:id', (req,res) => {
  const id = req.params.id;
  const deleted = users.find(u => u.id === id);
  users = users.filter(u => u.id !== id);
  if (!deleted) {
    //not the right id
    res.status(404).json({ message: "The user with the specified ID does not exist." });
  } else{
    //right id
    if(deleted){
      res.status(200).json(deleted);
    }else{
      res.status(500).json({ errorMessage: "The user could not be removed" });
    }
  }
})

//PUT request WORKS
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  let found = users.find(u => u.id === id);
  //if no name or bio
  if(!changes.name || !changes.bio ) {
    res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
  } else if (found) {
    // found
    found = Object.assign(found, changes); //update object with changes
    if (found) {
    res.status(200).json(found);
    }else{
      res.status(500).json({ errorMessage: 'The user information could not be modified.' });
    }
  } else {
    //not found
    res.status(404).json({ message: 'The user with the specified ID does not exist.' });
  }
  users = users.filter(u => u.id !== id);
  res.json(found);
})

//server is listening and the port
const PORT = 8000;
server.listen(PORT, () => console.log(`server running on port ${PORT} `));