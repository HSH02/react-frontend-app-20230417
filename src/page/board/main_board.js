import React from 'react';
import { Link } from 'react-router-dom';

function Board({ posts, boardPath, userName }) {  
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>자유게시판</h2>
        {userName ? (
          <Link to={`${boardPath}/write`} className="btn btn-primary">글쓰기</Link>
        ) : (
          <span className="mt-1 form-small-text">
            글쓰기는 로그인이 필요합니다
          </span>
        )}
      </div>
      <br />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">ID</th>
            <th scope="col">views</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.post_content}</td>
              <td>{post.post_id}</td>
              <td>{post.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
