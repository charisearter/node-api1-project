import React, { useState } from 'react'
import axios from 'axios';
import AddUser from './AddUser';


function UserList(props) {

const [users, setUsers] = useState([])
const url = 'http://localhost:8000'


const onDelete = (e, id) => {
  e.preventDefault();
  axios
  .delete(`${url}/api/users/${id}`)
  .then(res => setUsers(res.data))
  .catch(err => console.log(err.response.message))
};

  return (
    <div>
      <h3> Add a User </h3> 


      <AddUser />
      
{/* //display friends after button click */}
      {users.map(user => (
        <div key={user.id}>
          <h2> Name: {user.name}  </h2>
          <p> Age: {user.bio}  </p>
          <button onClick={(e) => onDelete(e, users.id)}>X</button>
        </div>
      ))}
   </div>  
    
  )
}

export default UserList