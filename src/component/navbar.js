import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import {NavLink} from 'react-router-dom';

export const Navbar = () => {
    // eslint-disable-next-line
    const {store, actions} = useContext(Context);

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
            <span id="open-sidebar" onClick={actions.open_sidebar}>&#9776;</span>
        </nav>
    );
}