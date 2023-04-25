import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './css/style.css';

// import jwt_decode from 'jwt-decode';

function Login({ onLogin }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    if( id === '' || id === null){
      alert("ID가 비어있습니다.");
      return;
    }

    if( password === '' || password === null){
      alert("패스워드가 비어있습니다.");
      return;
    }

    const requestBody = JSON.stringify({
      id,
      password
    })

    const response = await fetch('http://localhost:8080/user/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    const responseData = await response.json();
    
    if(response.ok){            
      // const token = jwt_decode(responseData.message);
      onLogin(responseData.message);
      
      alert("로그인 성공");
      // navigate("/");
    }else{
      alert(responseData.message)
    }

  }
  
  return (
    <Container className='mt-5'>
      <h2 className='mb-4'>로그인</h2>

      <Form onSubmit={handleSubmit} className='login-form'>
        <Form.Group controlId='formBasicId' className='mb-3'>
            <Form.Label>ID</Form.Label>
            <Form.Control type='text' placeholder='아이디를 입력하세요' value={id}  onChange={(e)=>setId(e.target.value)}/>
        </Form.Group>
      
        <Form.Group controlId='formBasicPassword' className='mb-3'>
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type='password' placeholder='비밀번호를 입력하세요' value={password} onChange={(e)=>setPassword(e.target.value)} />

        <Form.Text className='text-muted form-small-text'>
            비밀번호를 잊으셨나요?(미구현)
            {/* <Link to='/forgot-password'>비밀번호 재설정</Link> */}
        </Form.Text>
        </Form.Group>



        <Button className='mt-3' variant='primary' type='submit'>
        로그인
        </Button>


        <Row className='mt-3'>
          <Col>
            계정이 없으신가요?   <Link style={{textDecoration: "none" , marginLeft: "7.5px"}} to='/signUp'>회원가입</Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Login;