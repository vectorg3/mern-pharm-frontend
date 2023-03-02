import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from './redux/slices/auth';
import { fetchAuthMe } from './redux/slices/auth';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import CreateOrder from './pages/CreateOrder';
import UserOrders from './pages/UserOrders';
import { Shop } from './pages/Shop';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Product } from './pages/Products';
import { NotFound } from './pages/NotFound';

const App = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchAuthMe());
    }, []);
    return (
        <Routes>
            <Route path='/' element={<Main />}>
                <Route index element={<Shop />} />
                <Route path='/orders' element={<UserOrders />} />
                <Route path='/orders/create' element={<CreateOrder />} />
                <Route path='/product/:id' element={<Product />} />
                <Route path='*' element={<NotFound />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />} />
        </Routes>
    );
};

export default App;
