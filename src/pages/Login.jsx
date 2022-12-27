import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchLogin } from '../redux/slices/Auth/asyncAction';
import { selectIsAuth } from '../redux/slices/Auth';
import { Navigate } from 'react-router';

import styles from '../components/scss/Authorization.module.scss';
import { Link } from 'react-router-dom';

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values));
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
        <h1 style={{ textAlign: 'left' }}>Вход в аккаунт</h1>
        {errors.email?.message && <label>Email не указан</label>}
        <input
          {...register('email', { required: 'Укажите почту' })}
          type="email"
          placeholder="E-mail"
          required
        />
        {errors.password?.message && <label>Пароль не указан</label>}
        <input
          {...register('password', { required: 'Укажите пароль' })}
          type="password"
          placeholder="Пароль"
          required
        />
        <button type="submit" className={!isValid ? styles.disabled : ''}>
          Войти
        </button>
        <div className={styles.linkSignUp}>
          <p>Нет аккаунта?</p>
          <Link to="/Registration">Зарегистрироваться</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
