import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import {NavLink} from 'react-router-dom';

export const Sidebar = () => {
    // eslint-disable-next-line
    const {store, actions} = useContext(Context);

    // eslint-disable-next-line
    const [state, setState] = useState({
        side_menu: true
    });

    const nav_links = [
        {name:"Inicio", to: "/"},
        {name:"Equipos", to: "/equipos"},
        {name:"Reportes", to: "/reportes"},
        {name:"gastos", to: "/gastos"},
        {name:"planificación", to:"/planificación"}
    ];

    return (
        <div id="sideNav" className={store.side_bar ? "active":""}>
            <span className="closebtn" onClick={actions.close_sidebar}>&times;</span>
            <div id="role-select" className="btn-group">
                {store.user.roles.map(item => {
                    return (
                        <button key={item.name} className={item.active ? "active":""}>{item.name}</button>
                    )
                })}
            </div>
            {nav_links.map(item => {
                return (
                    <NavLink key={item.name} to={item.to} onClick={actions.close_sidebar} activeClassName="active-nav" exact>{item.name}</NavLink>
                )
            })}
        </div>
    )
}