import React from 'react';
import { Link } from 'react-router-dom';

import LogoFooter from '../assets/images/LogoFooter.svg';

import styles from './scss/Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.links}>
          <div>
            <Link to="/">
              <li>Главная</li>
            </Link>
            <Link to="/">
              <li>Список статей</li>
            </Link>
            <Link to="/">
              <li>Контакты</li>
            </Link>
          </div>
          <div>
            <Link to="/">
              <li>Контакты</li>
            </Link>
            <Link to="/">
              <li>Наша миссия</li>
            </Link>
            <Link to="">
              <li>Партнёры</li>
            </Link>
          </div>
        </div>

        <div className={styles.copyright}>
          <img src={LogoFooter} alt="Logo" />
          <p>
            All media, contents, articles and everything here are have copyright material and law.
          </p>
          <p>© 2022 Lunchpiration Media Limited.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
