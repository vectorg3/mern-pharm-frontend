import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../../components/Preloader';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/shop';
import { selectIsAuth } from '../../redux/slices/auth';
import { Cart } from '../../components/Cart/Cart';
import { CartList } from '../../components/Cart/CartList';
import styles from './ProductStyles.module.scss';

function Product() {
    const [product, setProduct] = useState({});
    const [analogues, setAnalogues] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { id } = useParams();
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
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
    useEffect(() => {
        axios
            .get(`https://mern-pharm-back.onrender.com/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
                setAnalogues(res.data.analogues);
            })
            .catch((err) => {
                console.warn(err);
            });
    }, []);
    if (isLoading) {
        return <Preloader />;
    }
    return (
        <>
            <div className={styles.product}>
                <img
                    src={product.full_background}
                    alt={product.name}
                    className={styles.product__img}
                />
                <div className={styles.product__title}>{product.name}</div>
                <div className={styles.product__description}>
                    {product.description}
                </div>
                <div className={styles.product__price}>{product.price} ₽</div>
                <div className={styles.analogues}>
                    {analogues.map((item) => (
                        <div key={item._id} className={styles.analogues__item}>
                            <img
                                src={item.full_background}
                                alt={item.name}
                                className={styles.analogue__img}
                            />
                            <div className={styles.analogue__title}>
                                {item.name}
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className={styles.product__add}
                    onClick={() => addToBasket(product)}
                >
                    В корзину
                </div>
            </div>
            {isAuth ? <Cart /> : <></>}
            <CartList />
        </>
    );
}
export { Product };
