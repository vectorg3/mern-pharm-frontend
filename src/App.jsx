import React from 'react';
import Hero from './components/Hero';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from './redux/slices/auth';
import { fetchAuthMe } from './redux/slices/auth';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import CreateOrder from './pages/CreateOrder';
import UserOrders from './pages/UserOrders';

const App = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    React.useEffect(() => {
        dispatch(fetchAuthMe());
    }, []);
    return (
        <Routes>
            <Route path='/' element={<Hero />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/orders' element={<UserOrders />} />
            <Route path='/orders/create' element={<CreateOrder />} />
        </Routes>
    );
};

export default App;
