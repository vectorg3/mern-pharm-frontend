import React from 'react';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { Link, Outlet } from 'react-router-dom';
import { toggleMenu } from '../../redux/slices/shop';

function Header() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const onClickLogout = () => {
        dispatch(logout);
        window.localStorage.removeItem('token');
        window.location.reload();
    };
    const menuVisible = useSelector((store) => store.shop.menuVisible);
    const handleMenu = () => {
        dispatch(toggleMenu());
    };
    return (
        <>
            <div className={styles.nav}>
                <div className={styles.nav__wrapper}>
                    <Link
                        to='/'
                        className={styles.nav__logo + ' ' + styles.nav__item}
                        onClick={() =>
                            menuVisible ? handleMenu() : console.log()
                        }
                    >
                        PharmBuy
                    </Link>
                    <ul className={styles.nav__list}>
                        {isAuth ? (
                            <>
                                <Link to='/orders' className={styles.nav__item}>
                                    Заказы
                                </Link>
                                <li className={styles.nav__item}>
                                    Личный кабинет
                                </li>
                                <li
                                    className={styles.nav__item}
                                    onClick={onClickLogout}
                                >
                                    Выйти
                                </li>
                            </>
                        ) : (
                            <>
                                <li className={styles.nav__item}>
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                        }}
                                        to='/login'
                                    >
                                        Войти
                                    </Link>
                                </li>
                                <li className={styles.nav__item}>
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                        }}
                                        to='/register'
                                    >
                                        Регистрация
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <i
                        className={'material-icons ' + styles.nav__burger}
                        style={{ fontSize: 50 }}
                        onClick={handleMenu}
                    >
                        {menuVisible ? 'close' : 'menu'}
                    </i>
                </div>
            </div>
        </>
    );
}
export { Header };
