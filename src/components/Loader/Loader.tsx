import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

function Loader(): JSX.Element {
  return (
    <Container style={{ margin: '40px auto', display: 'flex', justifyContent: 'center' }}>
      <Spinner animation="border" role="status" variant="info">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
}

export default Loader;
