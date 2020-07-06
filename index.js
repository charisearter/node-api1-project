const express = require('express'); //bring in express
const shortid = require('shortid');//bring in shortid

const server = express(); //get server

//teach express how to read json from body

server.use(express.json());

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

//GET request for users (only array of users)

server.get('/api/users', (req, res) => {
  res.status(200).json(users); //send user list 
});

//GET request for users by id (specific user)

// server.get('/api/users/:id', (req, res) => {
//   const id = req.params.id;
//   users = users.filter(u => users.id !== id);
//   const thatOne = users.find(users.id === id); //find the user with specific id
  

//   if(thatOne) {
//     //if same id
//     res.status(200).json(thatOne);
//   }else{
//     //not found
//     res.status(404).json({ message: 'No user by that id found' });
//   }
// });

//Post users (add a user)
server.post('/api/users', (req, res) => {
  const newUser = req.body;
  newUser.id = shortid.generate();
  users.push(newUser);
  res.status(200).json(newUser); //send user list 
});


//server is listening and the port
const PORT = 8000;
server.listen(PORT, () => console.log(`server running on port ${PORT} `));