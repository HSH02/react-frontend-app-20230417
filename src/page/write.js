import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge'; // Use Badge component

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [boardType, setBoardType] = useState('');

//   const writePost = async (e) => {
//     e.preventDefault();
//   };

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

        <Form className="write-from">
        <Form.Group controlId="formBasicTitle" className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Form.Text  className="mt-1">
           제목은 25글자까지 가능합니다.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicContent" className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Form.Text  className="mt-1">
           내용은은 2000글자까지 가능합니다.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicBoardType" className="mb-3">
          <Form.Label>게시판 종류</Form.Label>
          <Form.Control as="select" onChange={(e) => setBoardType(e.target.value)}>
            <option value="">게시판 종류 선택</option>
            <option value="free">자유 게시판</option>
            <option value="info">정보 게시판</option>            
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicCategory" className="mb-3">
          <Form.Label>카테고리</Form.Label>
          <InputGroup>
            <FormControl
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button variant="outline-secondary" onClick={addCategory}>
              등록
            </Button>
          </InputGroup>
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
