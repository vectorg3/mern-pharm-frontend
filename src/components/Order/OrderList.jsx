import { useSelector } from 'react-redux';
import { OrderItem } from './OrderItem';
import { CartItem } from '../Cart/CartItem';
import styles from './OrderStyles.module.scss';

function OrderList() {
    const order = useSelector((store) => store.shop.order);
    const totalPrice = order.reduce((sum, el) => {
        return sum + el.price * el.quantity;
    }, 0);
    return (
        <ul className='collection'>
            {order.length ? (
                order.map((item) => <CartItem key={item._id} {...item} />)
            ) : (
                <li className='collection-item'>Корзина пуста</li>
            )}
            <li className={styles.cart__footer}>
                Общая стоимость: {totalPrice} руб.
            </li>
        </ul>
    );
}
export { OrderList };
