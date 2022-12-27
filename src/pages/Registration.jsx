import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import noAvatar from '../assets/images/no-avatar.png';
import { selectIsAuth } from '../redux/slices/Auth';
import { fetchRegister } from '../redux/slices/Auth/asyncAction';

import styles from '../components/scss/Authorization.module.scss';
import { Link } from 'react-router-dom';

const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert('Не удалось авторизоваться');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <img src={noAvatar} alt="noAvatar" />
        <h1>Регистрация</h1>
        {errors.fullName?.message && <label>Имя не указано</label>}
        <div className={styles.input}>
          <b>∗</b>
          <input
            {...register('fullName', { required: 'Укажите имя' })}
            type="text"
            placeholder="Имя аккаунта"
          />
        </div>
        {errors.email?.message && <label>Email не указан</label>}
        <div className={styles.input}>
          <b>∗</b>
          <input
            {...register('email', { required: 'Укажите почту' })}
            type="email"
            placeholder="E-mail"
          />
        </div>
        {errors.password?.message && <label>Пароль не указан</label>}
        <div className={styles.input}>
          <b>∗</b>
          <input
            {...register('password', { required: 'Укажите пароль' })}
            type="password"
            placeholder="Пароль"
            required
          />
        </div>
        <button className={!isValid ? styles.disabled : ''} type="submit">
          Зарегистрироваться
        </button>
        <div className={styles.linkSignUp}>
          <p>Уже зарегестрированы?</p>
          <Link to="/Login">Войти</Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
