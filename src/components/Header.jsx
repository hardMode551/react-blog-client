import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from '../assets/images/Logo.svg';
import { logOut, selectIsAuth } from '../redux/slices/Auth';
import styles from './scss/Header.module.scss';

const Header = () => {
  const dispath = useDispatch(selectIsAuth);
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти из аккаунта?')) {
      dispath(logOut());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <header>
      <nav className={styles.header}>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <div className={styles.signMenu}>
          {isAuth ? (
            <>
              <Link to="/CreateBlog">
                <button className={styles.createPost}>Написать статью</button>
              </Link>
              <Link to="/">
                <button onClick={onClickLogout} className={styles.logOut}>
                  Выйти
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/Login">
                <button className={styles.signIn}>Войти</button>
              </Link>
              <Link to="/Registration">
                <button className={styles.signUp}>Зарегистрироваться</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
