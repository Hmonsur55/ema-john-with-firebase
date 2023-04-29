import React from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../Provider/AuthProvider';

const Header = () => {
    const { user, logOut} = useContext(authContext)
    const logouthandle = () => {
        logOut().then(() => {
            
        }).catch(error => {
            console.error(error.message)
        })
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
                {
                    user && <span className='text-white ml-2'>welcome {user.email}<button className='btn btn-primary ml-3' onClick={logouthandle}>Sign Out</button></span>
                }
            </div>
        </nav>
    );
};

export default Header;