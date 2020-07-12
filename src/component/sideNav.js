import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import {NavLink} from 'react-router-dom';

export const SideNav = () => {
    // eslint-disable-next-line
    const {store, actions} = useContext(Context);

    // selint-disable-next-line
    const [state, setStat] = useState({
        conteo: 0
    });

    const nav_links = [
        {name:"Dashboard", to: "/"},
        {name:"Equipos", to: "/equipos"},
        {name:"Reportes", to: "/reportes"},
        {name:"gastos", to: "/gastos"},
        {name:"planificación", to:"/planificación"}
    ];

    return (
        <div id="sideNav" className="col-md-2 container-fluid">
            <div className="btn-group">
                {store.user.roles.map(item => {
                    return (
                        <button className={item.active ? "active":""}>{item.name}</button>
                    )
                })}
            </div>
            <span style={{fontSize:"30px", cursor:"pointer"}}>&#9776; open</span>
            <ul className="snav-menu">
                {nav_links.map(item => {
                    return (
                        <li className="snav-item"><NavLink to={item.to}>{item.name}</NavLink></li>
                    )
                })}
            </ul>
        </div>
    )
}