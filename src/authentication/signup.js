import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import './css/style.css';

function SignUp() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const navigate = useNavigate(); // 이유?

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trim_name = name;
    const trim_id = id;
    const trim_email = email;

    if (trim_name === '' || trim_name === null) {
      alert("이름이 비어있습니다.");
      return;
    }

    if (trim_id === '' || trim_id === null) {
      alert("ID가 비어있습니다.");
      return;
    }

    if (trim_email === '' || trim_email === null) {
      alert("이메일이 비어있습니다.");
      return;
    }

    if (password === '' || password === null) {
      alert("패스워드가 비어있습니다.");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const requestBody = JSON.stringify({
      userName: trim_name,
      userId: trim_id,
      userEmail: trim_email,
      userPassword: password,
    });

    const response = await fetch('http://localhost:8080/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });


    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      navigate('/login');
    } else {
      alert(data.message);
    }
  };

  return (
    <Container className='mt-5'>
      <h2 className='mb-4'>회원가입</h2>

      <Form onSubmit={handleSubmit} className='signup-form'>
        <Form.Group controlId='formBasicName' className='mb-3'>
          <Form.Label>이름</Form.Label>
          <Form.Control type='text' placeholder='이름을 입력하세요 (한글과 영어만 가능합니다)' value={name} onChange={(e) => setName(e.target.value)} />
          <Form.Text className="mt-1 form-small-text">
            이름은 최대 10글자까지 가능합니다
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicId' className='mb-3'>
          <Form.Label>ID</Form.Label>
          <Form.Control type='text' placeholder='아이디를 입력하세요 (영문자와 숫자만 가능합니다)' value={id} onChange={(e) => setId(e.target.value)} />
          <Form.Text className="mt-1 form-small-text">
            ID는 4~15글자까지 가능합니다.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicEmail' className='mb-3'>
          <Form.Label>이메일</Form.Label>
          <Form.Control type='email' placeholder='이메일을 입력하세요' value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId='formBasicPassword' className='mb-3'>
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type='password' placeholder='비밀번호를 입력하세요 (영문자와 숫자, 특수기호만 가능합니다)' value={password} onChange={(e) => setPassword(e.target.value)} />
          <Form.Text className="mt-1 form-small-text">
            비밀번호는 6~20글자까지 가능합니다.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPasswordCheck' className='mb-3'>
          <Form.Label >비밀번호 확인</Form.Label>
          <Form.Control type='password' placeholder='비밀번호를 다시 입력하세요' value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
        </Form.Group>



        <Button className='mt-3' variant='primary' type='submit'>
          회원가입
        </Button>

        <Row className='mt-3'>
          <Col>
            이미 계정이 있으신가요? <Link style={{ textDecoration: "none", marginLeft: "7.5px" }} to='/login'>로그인</Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default SignUp;
