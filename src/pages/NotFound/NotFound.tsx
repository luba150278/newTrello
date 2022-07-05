import React from 'react';
import { ERROR_404_PAGE } from '../../common/constans/messages';
import NotAccess from '../../components/NotAccess/NotAccess';
import { withLayout } from '../../layout/Layout';

function NotFound(): JSX.Element {
  return <NotAccess messageText={ERROR_404_PAGE} />;
}

export default withLayout(NotFound);
