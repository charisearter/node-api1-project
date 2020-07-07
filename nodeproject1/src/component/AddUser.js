import React, { useState } from 'react'
import axios from 'axios'


function AddUser(props) {
  const { name, bio } = props;
const [form, setForm] = useState(
  {
    name: '',
    bio: '',
    id: ''
  }
);
const onChange = e => {
  e.preventDefault();
setForm({
  ...form,
  [e.target.name]: e.target.value
})
};
const url = 'http://localhost:8000'
const addUser = e => {
  console.log(form)
  axios
    .post(`${url}/api/users`, form)
    .then(res => { 
      console.log(res)
    })
    .catch(err => console.log(err.response));
};

  return (
    <div>
       <form onSubmit={addUser}>
        <label> Name: </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
          />

          <label> Bio: </label>
          <input
            type="text"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <button>Add User</button>
        </form>
    </div>
  )
}

export default AddUser