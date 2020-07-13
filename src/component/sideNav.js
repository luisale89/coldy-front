import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import {NavLink} from 'react-router-dom';

export const SideNav = () => {
    // eslint-disable-next-line
    const {store, actions} = useContext(Context);

    // selint-disable-next-line
    const [state, setState] = useState({
        side_menu: false
    });

    const nav_links = [
        {name:"Inicio", to: "/"},
        {name:"Equipos", to: "/equipos"},
        {name:"Reportes", to: "/reportes"},
        {name:"gastos", to: "/gastos"},
        {name:"planificación", to:"/planificación"}
    ];

    const hide_sidem = () => {
        const new_state = Object.assign(state, {side_menu: false});
        setState({
            side_menu: new_state,
            ...state
        })
    };

    const show_sidem = () => {
        const new_state = Object.assign(state, {side_menu: true});
        setState({
            side_menu: new_state,
            ...state
        })
    };

    return (
        <div id="sideNav" className={state.side_menu ? "sideNav active":"sideNav"}>
            <span id="open-sidem" onClick={show_sidem}>&#9776; Menú</span>
            <span className="closebtn" onClick={hide_sidem}>&times;</span>
            <div id="role-select" className="btn-group">
                {store.user.roles.map(item => {
                    return (
                        <button key={item.name} className={item.active ? "active":""}>{item.name}</button>
                    )
                })}
            </div>
            {nav_links.map(item => {
                return (
                    <NavLink key={item.name} to={item.to} onClick={hide_sidem} activeClassName="active-nav" exact>{item.name}</NavLink>
                )
            })}
        </div>
    )
}