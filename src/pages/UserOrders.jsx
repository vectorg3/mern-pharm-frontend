import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../components/Header/Header';
import { fetchUserOrders } from '../redux/slices/shop';
import { useEffect } from 'react';
import { UserOrderItem } from '../components/Order/UserOrderItem';
import { selectIsAuth } from '../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import styles from '../components/Order/OrderStyles.module.scss';

const UserOrders = () => {
    const isAuth = useSelector(selectIsAuth);
    const userOrders = useSelector((store) => store.shop.userOrders);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserOrders());
    }, []);

    return (
        <>
            {isAuth ? (
                <>
                    <Header />
                    <div className={styles.userOrders__field}>
                        {userOrders.length ? (
                            userOrders.map((item) => (
                                <UserOrderItem key={item._id} {...item} />
                            ))
                        ) : (
                            <li className='collection-item'>
                                Пока что заказов нет
                            </li>
                        )}
                    </div>
                </>
            ) : (
                <Navigate to='/' />
            )}
        </>
    );
};

export default UserOrders;
