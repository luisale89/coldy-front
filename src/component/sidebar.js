import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import {NavLink} from 'react-router-dom';

export const Sidebar = () => {
    // eslint-disable-next-line
    const {store, actions} = useContext(Context);

    const admin_links = [
        {name:"Inicio", to: "/", logo: 'fas fa-home'},
        {name:"Usuarios", to: "/usuarios", logo: 'fas fa-users'},
        {name:"Clientes", to: "/clientes", logo: 'fas fa-house-user'},
        {name:"Reportes", to: "/reportes", logo: 'far fa-chart-bar'},
        {name:"Alarmas", to:"/alarmas", logo: 'fas fa-exclamation-triangle'},
        {name:"Planificación", to:"/planificacion", logo:'far fa-calendar-alt'}
    ];
    //eslint-disable-next-line
    const mante_links = [
        {name:"Inicio", to:"/mantenedor", logo:""},
        {name:"Mantenimiento", to:"/mantenedor/mtto", logo:""},
        {name:"Mis Reportes", to:"/mantenedor/reportes", logo:""},
        {name:"Alarmas", to:"/mantenedor/alarmas", logo:""},
        {name:"Tareas", to:"/mantenedor/tareas", logo:""},
    ];

    return (
        <div id="sideNav" className={store.side_bar ? "active":""}>
            <span className="closebtn" onClick={actions.close_sidebar}>&times;</span>
            <div id="role-select" className="btn-group">
                {store.user.roles.map(item => {
                    return (
                        <NavLink to={`/${item.id}`} key={item.id} className="select-item"activeClassName="active">{item.name}</NavLink>
                    )
                })}
            </div>
            <div className="nav-zone">
                {admin_links.map(item => {
                    return (
                        <NavLink key={item.name} to={item.to} onClick={actions.close_sidebar} activeClassName="active-nav" exact>
                            <i className={item.logo}></i>
                            <span>{item.name}</span>
                        </NavLink>
                    )
                })}
            </div>
        </div>
    )
}