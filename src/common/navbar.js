import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ userName , logout }) => {
    
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }; 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand ms-3">
         <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>게시판</Link>          
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto me-3 mb-2 mb-lg-0">            
            <li className="nav-item">
              <div className="nav-link">
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/board'>자유게시판</Link>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                정보게시판
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                자료게시판
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                {userName ? (
                  <div>내 정보</div>
                ):(
                  <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/login'>로그인</Link>
                  )}              
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                {userName ? <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/login' onClick={handleLogout}>로그아웃</Link> : <> </> }
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
