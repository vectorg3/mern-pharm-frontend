import styles from './OrderStyles.module.scss'
import { removeFromCart } from '../../redux/slices/shop';
import { useDispatch } from 'react-redux';
import { incQuantity, decQuantity } from '../../redux/slices/shop';
function OrderItem(props) {
    const dispatch = useDispatch();
    const { id, name, full_background, price, quantity } = props;
    return (
        <li className='collection-item avatar cart__item'>
            <img src={full_background} alt='' class='circle' />
            <div className='cart__item-title'>{name}</div>
            <p>
                Кол-во:
                <span
                    className='quantity__btn'
                    onClick={() => {
                        dispatch(decQuantity({ id }));
                    }}
                >
                    -
                </span>
                <span className='cart__quantity'>{quantity}</span>
                <span
                    className='quantity__btn'
                    onClick={() => {
                        dispatch(incQuantity({ id }));
                    }}
                >
                    +
                </span>
                = {price * quantity} руб.
            </p>

            <span
                className='secondary-content remove-item'
                onClick={() => dispatch(removeFromCart({ id }))}
            >
                <i className='material-icons cart-delete'>close</i>
            </span>
        </li>
    );
}
export { OrderItem };
