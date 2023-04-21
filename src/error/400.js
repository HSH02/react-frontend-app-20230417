import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Error404 = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(90vh - 120px)" }}>
            <Row className="d-flex align-items-center justify-content-center">
                <Col>
                    <h2 className="text-center">페이지가 없습니다</h2>
                </Col>
            </Row>
        </Container>
    );
};

export default Error404;