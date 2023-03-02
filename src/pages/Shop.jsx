import { useEffect } from 'react';
import { Cart } from '../components/Cart/Cart';
import { Preloader } from '../components/Preloader';
import { GoodsList } from '../components/Goods/GoodsList';
import { CartList } from '../components/Cart/CartList';
import { Header } from '../components/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/slices/shop';
import { selectIsAuth } from '../redux/slices/auth';
import { Menu } from '../components/Header/Menu';

const Shop = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const order = useSelector((store) => store.shop.order);
    const loading = useSelector((store) => store.shop.loading);
    useEffect(function getGoods() {
        dispatch(fetchProducts());
    }, []);

    return (
        <main className='container content'>
            {isAuth ? <Cart quantity={order.length} /> : <></>}
            {loading ? <Preloader /> : <GoodsList />}
            <CartList />
        </main>
    );
};
export { Shop };
