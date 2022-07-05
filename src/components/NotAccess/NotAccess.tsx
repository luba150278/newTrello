import React from 'react';
import { Container } from 'react-bootstrap';
import LinkToMain from '../LinkToMain/Link';

type IProps = {
  messageText: string;
};

function NotAccess({ messageText }: IProps): JSX.Element {
  return (
    <section>
      <Container>
        <p>{messageText}</p>
        <LinkToMain />
      </Container>
    </section>
  );
}

export default NotAccess;
