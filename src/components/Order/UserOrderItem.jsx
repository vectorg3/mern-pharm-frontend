import { useDispatch } from "react-redux";
import styles from "./OrderStyles.module.scss";

function UserOrderItem(props) {
  const { _id, address, phone, orderList, status } = props;
  return (
    <li className={styles.order__item}>
      <div className={styles.cart__item_title}>Заказ {_id}</div>
      <div className={styles.orders__list}>
        {orderList.map((el) => (
          <div className={styles.cart__list}>
            <img
              src={el.full_background}
              alt=""
              className={styles.cart__item_img}
            />
            <div className={styles.cart__item}>{el.name}</div>
            <div className={styles.cart__item}>
              Кол-во:
              <span className={styles.cart__quantity}>{el.quantity}</span>={" "}
              {el.price * el.quantity} руб.
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cart__item}>
        Адрес: <span style={{ fontWeight: "bold" }}>{address}</span>
      </div>
      <div className={styles.cart__item}>
        Номер телефона: <span style={{ fontWeight: "bold" }}>{phone}</span>
      </div>
      <div className={styles.cart__item}>
        Статус: <span style={{ fontWeight: "bold" }}>{status}</span>
      </div>
    </li>
  );
}
export { UserOrderItem };
