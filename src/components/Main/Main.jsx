import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Menu } from '../Header/Menu';

function Main() {
    return (
        <>
            <Header />
            <Menu />
            <Outlet />
        </>
    );
}
export { Main };
