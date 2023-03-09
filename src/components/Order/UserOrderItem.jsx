import { useDispatch } from 'react-redux';
import styles from './OrderStyles.module.scss';

function UserOrderItem(props) {
    const { _id, address, phone, orderList, status } = props;
    return (
        <li className={styles.order__item}>
            <div className={styles.cart__item_title}>Заказ {_id}</div>
            <div>
                {orderList.map((el) => (
                    <li className={styles.cart__item}>
                        <img
                            src={el.full_background}
                            alt=''
                            className={styles.cart__item_img}
                        />
                        <div className={styles.cart__item_title}>
                            {el.name}
                            <p>
                                Кол-во:
                                <span className={styles.cart__quantity}>
                                    {el.quantity}
                                </span>
                                = {el.price * el.quantity} руб.
                            </p>
                        </div>
                    </li>
                ))}
            </div>
            <div className={styles.cart__item_title}>
                Адрес: <span style={{ background: '#7b68ee' }}>{address}</span>
            </div>
            <div className={styles.cart__item_title}>
                Номер телефона: <span style={{ background: '#7b68ee' }}>{phone}</span>
            </div>
            <div className={styles.cart__item_title}>
                Статус: <span style={{ background: '#7b68ee' }}>{status}</span>
            </div>
        </li>
    );
}
export { UserOrderItem };
