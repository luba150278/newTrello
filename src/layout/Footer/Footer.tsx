import React from 'react';
import cn from 'classnames';
import { format } from 'date-fns';
import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';

export function Footer({ className, ...props }: FooterProps): JSX.Element {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div className={styles.footerDescribe}>Created by Lyubov Myetolkina 2021 - {format(new Date(), 'yyyy')} </div>
    </footer>
  );
}
