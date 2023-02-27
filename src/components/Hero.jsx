import React from 'react';
import { Header } from './Header/Header';
import { Shop } from '../pages/Shop';
import { Menu } from './Header/Menu';

const Hero = () => {
    return (
        <>
            <Menu />
            <Shop />
        </>
    );
};
export default Hero;
