import React from 'react';
import { ToastContainer } from 'react-toastify';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
// import cn from "classnames";
import { Footer } from './Footer/Footer';
import Header from './Header/Header';

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.body}>{children}</div>
      <Footer className={styles.footer} />
      <ToastContainer />
    </div>
  );
}

export const withLayout = <T extends Record<string, unknown>>(Component: React.FC<T>) =>
  function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
