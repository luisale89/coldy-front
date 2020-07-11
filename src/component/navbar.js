import React from 'react';
// import { Context } from '../store/appContext';
// import {NavLink} from 'react';

export const Navbar = () => {
    return (
        <nav className="nav-container">
            <div className="coldy-logo">coldy App</div>
            <div className="main-search">
                <button type="button" className="btn btn-outline-danger">Buscar</button>
                <div>seach bar</div>
            </div>
            <div className="user-box">user</div>
        </nav>
    );
}