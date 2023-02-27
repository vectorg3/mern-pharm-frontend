import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Login = () => {
    const MySwal = withReactContent(Swal);
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
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
        const data = await dispatch(fetchAuth(values));
        if (!data.payload) {
            MySwal.fire({
                icon: 'error',
                title: 'Не удалось авторизоваться',
                text: 'Проверьте введённые данные',
            });
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
                <div className='title'>Вход</div>

                <div className='form__email form__group'>
                    <label>Почта</label>
                    <input
                        placeholder='example@email.ru'
                        type='email'
                        {...register('email', { required: 'Укажите почту' })}
                        autoFocus
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
                    Вход
                </button>
                <div className='form__help'>
                    Еще не зарегистрировались? Нажмите, чтобы{' '}
                    <Link to='/register' className='log_link'>
                        зарегистрироваться
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
