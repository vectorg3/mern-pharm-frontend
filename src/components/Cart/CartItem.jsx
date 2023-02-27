import { removeFromCart } from '../../redux/slices/shop';
import { useDispatch } from 'react-redux';
import { incQuantity, decQuantity } from '../../redux/slices/shop';
import styles from './CartStyles.module.scss';

function CartItem(props) {
    const dispatch = useDispatch();
    const { id, name, full_background, price, quantity } = props;
    return (
        <li className={ styles.cart__item}>
            <img
                src={full_background}
                alt=''
                className={styles.cart__item_img}
            />
            <div className={styles.cart__item_title}>
                {name}
                <p>
                    Кол-во:
                    <span
                        className={styles.quantity__btn}
                        onClick={() => {
                            dispatch(decQuantity({ id }));
                        }}
                    >
                        -
                    </span>
                    <span className={styles.cart__quantity}>{quantity}</span>
                    <span
                        className={styles.quantity__btn}
                        onClick={() => {
                            dispatch(incQuantity({ id }));
                        }}
                    >
                        +
                    </span>
                    = {price * quantity} руб.
                </p>
            </div>

            <span
                className={'secondary-content ' + styles.remove_item}
                onClick={() => dispatch(removeFromCart({ id }))}
            >
                <i className={'material-icons ' + styles.cart_delete}>close</i>
            </span>
        </li>
    );
}
export { CartItem };
