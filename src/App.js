import React, { useState, useEffect } from 'react';

function App(){
  const [Users, setUsers] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/allUsers')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  },[]);  

  

  if(!Users){
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Users List</h1>      
      <ul>
        {Users.map((user => 
          <li key={user.user_id}>
              Name: {user.user_name} | Email: {user.email} | User_role: {user.user_role} | email: {user.email}
          </li>
        ))}
      </ul>

      
    </div>
  )
}

export default App;