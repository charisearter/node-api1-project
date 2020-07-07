import React from 'react'

function Card(props) {
  return (
    <div>
      
      <h2>Name: {props.users.name} </h2>
      <h3>ID: {props.users.id}</h3>
      <p>Bio: {props.users.bio} </p>
      
    </div>
  )
}

export default Card
