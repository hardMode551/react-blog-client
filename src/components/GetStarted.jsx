import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Dude from '../assets/images/Dude.svg';
import Calendar from '../assets/images/Calendar.svg';
import Finger from '../assets/images/Finger.png';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/Auth';

import styles from './scss/GetStarted.module.scss';

const textAnimation = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

const GetStarted = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
      className={styles.root}
    >
      <div className={styles.title}>
        <motion.h1 custom={1} variants={textAnimation}>
          Есть полезные знания, которыми вы хотите поделиться?
        </motion.h1>
        <motion.p custom={1.2} variants={textAnimation}>
          Мы можем предоставить вам такую возможность!
        </motion.p>
        <Link to={!isAuth ? '/Login' : '/CreateBlog'}>
          <button whileTap={'white'} custom={1.4} variants={textAnimation}>
            Начать
          </button>
        </Link>
        <img src={Finger} alt="Finger" />
      </div>
      <div className={styles.images}>
        <img className={styles.dude} src={Dude} alt="Dude" />
        <img className={styles.calendar} src={Calendar} alt="Calendar" />
      </div>
    </motion.div>
  );
};

export default GetStarted;
