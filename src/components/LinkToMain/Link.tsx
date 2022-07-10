import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import styles from './Link.module.css';

function LinkToMain(): JSX.Element {
  return (
    <Link to="/" className={styles.linkToHome}>
      <Icon
        iconChild={<AiOutlineHome />}
        styles={{
          className: 'icon',
          size: '25',
        }}
        isToolTip={false}
      />
      Home
    </Link>
  );
}

export default LinkToMain;
