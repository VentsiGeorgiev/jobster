import { Outlet, NavLink } from 'react-router-dom';

function SharedLayout() {
    return (
        <>
            <nav>
                <menu>
                    <li><NavLink to='add-job'>Add Job</NavLink></li>
                    <li><NavLink to='all-jobs'>All Jobs</NavLink></li>
                </menu>
            </nav>
            <hr />
            <Outlet />
        </>
    );
}

export default SharedLayout;