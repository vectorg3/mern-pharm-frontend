import styles from './CartStyles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../../redux/slices/shop';

function Cart() {
    const dispatch = useDispatch();
    const order = useSelector((store) => store.shop.order);
    const handleCartShow = () => {
        dispatch(toggleCart());
    };
    const quantity = order.length;
    return (
        <div className={styles.cart} onClick={handleCartShow}>
            <i className='material-icons' style={{ color: 'white' }}>
                shopping_cart
            </i>
            <span style={{ margin: '10px', fontSize: 16, color: 'white' }}>
                Корзина
            </span>
            {quantity ? (
                <span className={styles.cart__quantity_bg}>{quantity}</span>
            ) : null}
        </div>
    );
}
export { Cart };
