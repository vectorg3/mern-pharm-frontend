import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../redux/slices/auth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { fetchCreateOrder } from '../redux/slices/shop';
import { Header } from '../components/Header/Header';
import { Navigate } from 'react-router-dom';
import { CartItem } from '../components/Cart/CartItem';
import { OrderList } from '../components/Order/OrderList';
import { createOrderValidate } from '../redux/validators/createOrder';

const CreateOrder = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const MySwal = withReactContent(Swal);
    const order = useSelector((store) => store.shop.order);
    const totalPrice = order.reduce((sum, el) => {
        return sum + el.price * el.quantity;
    }, 0);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            address: '',
            phone: '',
        },
        mode: 'onChange',
    });
    const onSubmit = async (values) => {
        if (!createOrderValidate(values, order)) {
            return;
        }
        const data = await dispatch(
            fetchCreateOrder({ ...values, orderList: order })
        );
        if (!data.payload) {
            MySwal.fire({
                icon: 'error',
                title: 'Не удалось создать заказ',
                text: 'Проверьте введённые данные',
            });
            return;
        } else {
            MySwal.fire({
                icon: 'success',
                title: 'Заказ успешно создан',
            });
        }
    };
    return isAuth ? (
        <>
            <Header />
            <div className='log_form form'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='form__wrapper'
                    style={{width: '100%',}}
                >
                    <div className='title'>Оформление заказа</div>
                    <OrderList />

                    <div className='form__address form__group'>
                        <label>Адрес</label>
                        <input
                            placeholder='Адрес'
                            type='text'
                            {...register('address')}
                            autoFocus
                        />
                        <span style={{ color: 'red' }}>
                            {errors.address?.message}
                        </span>
                    </div>
                    <div className='form__password form__group'>
                        <label>Номер телефона</label>
                        <input
                            placeholder='Номер телефона'
                            type='tel'
                            {...register('phone')}
                        />
                        <span style={{ color: 'red' }}>
                            {errors.phone?.message}
                        </span>
                    </div>
                    <button className='form__button' type='submit'>
                        Оформить
                    </button>
                </form>
            </div>
        </>
    ) : (
        <Navigate to='/' />
    );
};

export default CreateOrder;
