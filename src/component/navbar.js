import React from 'react';
// import { Context } from '../store/appContext';
import {NavLink} from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav id="navbar">
            <NavLink to="/" className="coldy-logo">
                <div>coldy App</div>
            </NavLink>
            <div className="main-search">
                <button type="button" className="btn btn-secondary">Equipo</button>
                <input type="text" className="main-search" placeholder="Buscar..."></input>
            </div>
            <div className="user-box">user</div>
        </nav>
    );
}