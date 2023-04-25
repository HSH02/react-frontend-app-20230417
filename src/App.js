import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Footer from './common/footer';
import Navbar from './common/navbar';

import Board from './page/board/main_board';
import Homepage from './page/homepage';
import Write from './page/write';


import Login from './authentication/login';
import Signup from './authentication/signup';

import Error404 from './error/400.js';

function App() {
  const [posts, setPosts] = useState(null);
  const [userName, setUserName] = useState(null);
  
  const handleLogin = (encryptedToken) => {
    // const decodeToken = jwtDecode(encryptedToken);
    // const token = JSON.stringify(decodeToken);    
    localStorage.setItem("token", encryptedToken);    
    window.location.replace("/")
    // setUserName(token.name);
  };

  function logout() {
    localStorage.removeItem("token");
    setUserName(null);
    alert("로그아웃 되었습니다.")
  }
  
  const boardElement = posts ? (
    <Board posts={posts} boardPath="/board" userName={userName} />
  ) : (
    <div className="container mt-5"><h1>Loading...</h1></div>
  );

  useEffect(() => {
    fetch('http://localhost:8080/post/search')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  useEffect(() => {    
    if(localStorage.getItem("token")){
      const encryptedToken = localStorage.getItem("token");      
      const decodeToken = jwtDecode(encryptedToken);            
      setUserName(decodeToken.name);
    }
  },[]);

  return (
    <div id="root">
      <Router>
        <Navbar userName={userName} logout={logout} />

        <Routes>

          <Route path="/" element={<Homepage />} />
          <Route path="/board" element={boardElement} />

          <Route path="/board/write" element={<Write />} />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<Error404 />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;

