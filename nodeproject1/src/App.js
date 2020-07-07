import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './component/Card';
import './App.css';
import UserList from './component/UserList';



function App() {

const url = 'http://localhost:8000'
const [users, setUsers] = useState([]);

useEffect(() => {
  axios
  .get(`${url}/api/users`)
  .then((res) => {
    const theUserList = res.data;
      console.log(theUserList);
      setUsers(theUserList);
  })//end then
},[]);//end useEffect

//get users after button click
const getUsers = e => {
  e.preventDefault();
  axios
    .get(`${url}/api/users`)
    .then(res => { 
      setUsers(res.data)
    })
    .catch(err => console.log(err.response));
};

//delete users
const onDelete = (e, id) => {
  e.preventDefault();
  axios
  .delete(`${url}/api/users/${id}`)
  .then(res => setUsers(res.data))
  .catch(err => console.log(err.response.message))
};
  return (
    <div className="App">
     <h1> The Users</h1>
     {users.map((users, id) => <Card key = {id} users = {users} />)}
     <UserList />
    </div>
  );
}

export default App;
