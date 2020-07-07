import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './component/Card';


import './App.css';



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

  return (
    <div className="App">
     <h1> The Users</h1>
     {users.map((users, id) => <Card key = {id} users = {users} />)}
    </div>
  );
}

export default App;
