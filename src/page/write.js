import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import {useNavigate}  from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge'; 

function Write() {
  const [title, setTitle] = useState('');
  const [boardType, setBoardType] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  
  const navigate = useNavigate();

  const writePost = async (e) => {
    e.preventDefault();

    if(title === '' || title === null){
      alert("제목이 비어있습니다");
      return; 
    }
    if(boardType === '' || boardType === null){
      alert("타입이 선택되지 않았습니다.");
      return; 
    }
    if(content === '' || content === null){
      alert("내용이 비어있습니다");
      return; 
    }

    const encryptedToken = localStorage.getItem("token");
    const decodedToken = jwtDecode(encryptedToken);
    const uuid = decodedToken.uuid;


    const requestBody = JSON.stringify({
        title,
        boardType,
        content,
        categories,
        uuid
    })
    
    const response = await fetch('http://localhost:8080/post/create',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',      
      },
      body: requestBody,
    });

    const responseData = await response.json();
    console.log(responseData);
    if(response.ok){                       
      alert(responseData.message);
      window.location.replace("/board")
    }else{
      alert(responseData.message)
    }
  };

  const addCategory = () => {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
    }
    setCategory('');
  };

  const removeCategory = (removedCategory) => {
    setCategories(categories.filter((category) => category !== removedCategory));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCategory();
    }
   };

  return (
    <Container className="mt-5"  >
      <h2 className="mb-4">글쓰기</h2>

      <Form onSubmit={writePost} className="write-from">
        <Form.Group controlId="formBasicTitle" className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Form.Text className="mt-1">
            제목은 25글자까지 가능합니다.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicBoardType" className="mb-3">
          <Form.Label>게시판 종류</Form.Label>
          <Form.Control as="select" onChange={(e) => setBoardType(e.target.value)}>
            <option value="">게시판 종류 선택</option>
            <option value="자유게시판">자유 게시판</option>
            {/* <option value="info">정보 게시판</option> */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicContent" className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Form.Text className="mt-1">
            내용은 2000글자까지 가능합니다.
          </Form.Text>
        </Form.Group>
        
        <Form.Group controlId="formBasicCategory" className="mb-3">
          <Form.Label>카테고리</Form.Label>
          <InputGroup>
            <FormControl
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={categories.length >= 10}
              maxLength={10}
            />
            <Button variant="outline-secondary" onClick={addCategory}>
              등록
            </Button>
          </InputGroup>
          <Form.Text className="mt-1">
            카테고리는 이름 길이와 갯수가 최대 10개까지 등록가능합니다
          </Form.Text>
          <div className="mt-2">
            {categories.map((cat, index) => (
              <Badge
                key={index}
                pill
                variant="secondary"
                style={{
                  marginRight: '8px', // Adjust marginRight
                  marginBottom: '4px', // Adjust marginBottom
                }}
              >
                #{cat}&nbsp;
                <span
                  style={{
                    cursor: 'pointer', // Add cursor style
                    paddingLeft: '3px', // Add 3px space
                    paddingRight: '3px' // Add 3px space
                  }}
                  onClick={() => removeCategory(cat)}
                >
                  x
                </span>
              </Badge>
            ))}
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          작성
        </Button>
        
      </Form>
    </Container>
  );
}

export default Write;
