import axios from 'axios';
import {MySwal , Toast} from '../../alerts.js'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
            .get(`${process.env.REACT_APP_API_URL}/products/${id}`)
            // .get(`https://mern-pharm-back.onrender.com/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
                setAnalogues(res.data.analogues);
            })
            .catch((err) => {
                console.warn(err);
            });
    }, [id]);
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
                <div className={styles.analogues__title}>Аналоги:</div>
                <div className={styles.analogues}>
                    {analogues.map((item) => (
                        <Link
                            to={`/product/${item._id}`}
                            key={item._id}
                            className={styles.analogues__item}
                        >
                            <img
                                src={item.full_background}
                                alt={item.name}
                                className={styles.analogue__img}
                            />
                            <div className={styles.analogue__title}>
                                {item.name}
                            </div>
                        </Link>
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
