import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/shop';
import { selectIsAuth } from '../../redux/slices/auth';
import { Link } from 'react-router-dom';
import styles from './GoodStyles.module.scss';

function GoodsItem(props) {
    const isAuth = useSelector(selectIsAuth);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });
    const MySwal = withReactContent(Swal);

    const dispatch = useDispatch();
    const { _id, name, description, price, full_background } = props;
    const addToBasket = (item) => {
        if (isAuth) {
            dispatch(addToCart(item));
            Toast.fire({
                icon: 'success',
                title: item.name + ' успешно добавлен в корзину',
            });
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Нет доступа',
                text: 'Вам нужно авторизоваться',
            });
        }
    };
    return (
        <div className={styles.card}>
            <div className={styles.card__top}>
                <Link to={`/product/${_id}`} className={styles.card__image}>
                    <img src={full_background} alt={name} />
                </Link>
            </div>
            <div className={styles.card__bottom}>
                <div className={styles.card__prices}>
                    <div className={styles.card__price_common}>{price} ₽</div>
                </div>
                <Link to={`/product/${_id}`} className={styles.card__title}>
                    {name}
                </Link>
                <div
                    className={styles.card__add}
                    onClick={() =>
                        addToBasket({ _id, name, price, full_background })
                    }
                >
                    В корзину
                </div>
            </div>
        </div>
    );
}
export { GoodsItem };
