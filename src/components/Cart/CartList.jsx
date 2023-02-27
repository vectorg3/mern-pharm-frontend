import { CartItem } from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../../redux/slices/shop';
import { Link } from 'react-router-dom';
import styles from './CartStyles.module.scss';

function CartList() {
    const isCartShow = useSelector((store) => store.shop.isCartShow);
    const dispatch = useDispatch();
    const order = useSelector((store) => store.shop.order);
    const totalPrice = order.reduce((sum, el) => {
        return sum + el.price * el.quantity;
    }, 0);
    const handleCartShow = () => {
        dispatch(toggleCart());
    };
    return (
        <ul
            className={
                isCartShow
                    ? styles.cart_list
                    : styles.cart_list + ' ' + styles.disabled
            }
        >
            <li className={styles.cart__header}>Корзина</li>
            {order.length ? (
                order.map((item) => <CartItem key={item.id} {...item} />)
            ) : (
                <li className={styles.cart__item}>Корзина пуста</li>
            )}
            <li className={styles.cart__footer}>
                <p>Общая стоимость: {totalPrice} руб.</p>
                <Link className={styles.cart_btn} to='/orders/create'>
                    Оформить
                </Link>
            </li>
            <i
                className={'material-icons ' + styles.cart_close}
                onClick={handleCartShow}
            >
                close
            </i>
        </ul>
    );
}
export { CartList };
