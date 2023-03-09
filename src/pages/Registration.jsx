import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { MySwal } from '../alerts';

const Registration = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
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
            if (values.fullName.length < 3) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Не удалось зарегистрироваться',
                    text: 'Минимальная длина имени - 3 символа',
                });
            }
            if (values.password.length < 5) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Не удалось зарегистрироваться',
                    text: 'Минимальная длина пароля - 5 символа',
                });
            }

            return;
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };
    if (isAuth) {
        return <Navigate to='/' />;
    }

    return (
        <div className='log_form form'>
            <form onSubmit={handleSubmit(onSubmit)} className='form__wrapper'>
                <div className='title'>Регистрация</div>
                <div className='form__name form__group'>
                    <label>Ваше имя</label>
                    <input
                        placeholder='Имя'
                        type='text'
                        {...register('fullName', { required: 'Укажите имя' })}
                        autoFocus
                    />
                    <span style={{ color: 'red' }}>
                        {errors.fullName?.message}
                    </span>
                </div>
                <div className='form__email form__group'>
                    <label>Почта</label>
                    <input
                        placeholder='example@email.ru'
                        type='email'
                        {...register('email', { required: 'Укажите почту' })}
                    />
                    <span style={{ color: 'red' }}>
                        {errors.email?.message}
                    </span>
                </div>
                <div className='form__password form__group'>
                    <label>Пароль</label>
                    <input
                        placeholder='Пароль'
                        type='password'
                        {...register('password', {
                            required: 'Укажите пароль',
                        })}
                    />
                    <span style={{ color: 'red' }}>
                        {errors.password?.message}
                    </span>
                </div>
                <button className='form__button' type='submit'>
                    Регистрация
                </button>
                <div className='form__help'>
                    Уже есть аккаунт? Нажмите, чтобы{' '}
                    <Link to='/login' className='log_link'>
                        войти
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Registration;
