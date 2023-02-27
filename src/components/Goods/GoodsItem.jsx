import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/shop';
import { selectIsAuth } from '../../redux/slices/auth';

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
    const { id, name, description, price, full_background } = props;
    const addToBasket = (item) => {
        if (isAuth) {
            dispatch(addToCart(item));
            Toast.fire({
                icon: 'success',
                title: item.name + ' успешно добавлен в корзину',
            });
        }else {
            MySwal.fire({
                icon: 'error',
                title: 'Нет доступа',
                text: 'Вам нужно авторизоваться',
            });
        }
    };
    return (
        <div className='card'>
            <div
                className='card-image'
                style={{ height: 250, overflow: 'hidden' }}
            >
                <img src={full_background} alt={name} style={{ padding: 10 }} />
            </div>
            <div className='card-content'>
                <span className='card-title'>{name}</span>
                <p>{description}</p>
            </div>
            <div className='card-action'>
                <button
                    className='btn goods__item__btn'
                    onClick={() =>
                        addToBasket({ id, name, price, full_background })
                    }
                >
                    Купить
                </button>
                <span className='right' style={{ fontSize: '1.5rem' }}>
                    {price} руб.
                </span>
            </div>
        </div>
    );
}
export { GoodsItem };
