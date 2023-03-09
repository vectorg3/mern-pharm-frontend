import { MySwal } from "../alerts";
export const createOrderValidate = (values, order) => {
    if (values.address.length < 5) {
        MySwal.fire({
            icon: 'error',
            title: 'Ошибка',
            text: 'Минимальная длина адреса - 5 символов',
        });
        return false;
    } else if (values.phone.length < 11) {
        MySwal.fire({
            icon: 'error',
            title: 'Ошибка',
            text: 'Неправильно указан номер',
        });
        return false;
    } else if (order.length === 0) {
        MySwal.fire({
            icon: 'error',
            title: 'Ошибка',
            text: 'Корзина пуста!',
        });
        return false;
    }else {
        return true;
    }
};
