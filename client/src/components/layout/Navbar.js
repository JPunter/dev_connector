import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'>
                    <i className='fas fa-code'/> DevConnector
                </Link>
            </h1>
            <ul>
                <li>
                    <Link to='!#'>
                        <i className='fas fa-code'/> Developers
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <i className='fas fa-code'/> Register
                    </Link>
                </li>
                <li>
                    <Link to='/login'>
                        <i className='fas fa-code'/> Login
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
