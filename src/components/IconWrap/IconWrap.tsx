/* eslint-disable react/require-default-props */
import React from 'react';
import { IconWrapProps } from '../../interfaces/IconWrapProps';
import Icon from '../Icon/Icon';
import styles from './IconWrap.module.css';

function IconWrap(props: IconWrapProps): JSX.Element {
  const { onClick, iconChild, iconStyles, className } = props;
  return (
    <div onClick={onClick} className={styles[className]}>
      <Icon iconChild={iconChild} styles={iconStyles} isToolTip={false} toolTipText="" />
    </div>
  );
}

export default IconWrap;
