import styles from './Menu.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { Link } from 'react-router-dom';
import { toggleMenu } from '../../redux/slices/shop';

function Menu() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const onClickLogout = () => {
        dispatch(toggleMenu());
        dispatch(logout);
        window.localStorage.removeItem('token');
        window.location.reload();
    };
    const menuVisible = useSelector((store) => store.shop.menuVisible);
    return (
        <ul
            className={
                menuVisible
                    ? styles.mobile__menu + ' ' + styles.active
                    : styles.mobile__menu
            }
        >
            {isAuth ? (
                <>
                    <li className={styles.menu__item}>Заказы</li>
                    <li className={styles.menu__item}>Личный кабинет</li>
                    <li className={styles.menu__item} onClick={onClickLogout}>
                        Выйти
                    </li>
                </>
            ) : (
                <>
                    <>
                        <li className={styles.menu__item}>
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                }}
                                to='/login'
                            >
                                Войти
                            </Link>
                        </li>
                        <li className={styles.menu__item}>
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                }}
                                to='/register'
                            >
                                Регистрация
                            </Link>
                        </li>
                    </>
                </>
            )}
        </ul>
    );
}
export { Menu };
