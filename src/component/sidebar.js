import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import {NavLink} from 'react-router-dom';

export const Sidebar = () => {
    // eslint-disable-next-line
    const {store, actions} = useContext(Context);

    const app_links = [ //en esta variable se definen todas las rutas de la app. role va a mostrar las correspondientes.
        //admin links
        {role: 0, name: "Inicio", to: `/${store.app_roles[0].name}`, logo: 'fas fa-home'},
        {role: 0, name: "Usuarios", to: `/${store.app_roles[0].name}/usuarios`, logo: 'fas fa-users'},
        {role: 0, name: "Clientes", to: `/${store.app_roles[0].name}/clientes`, logo: 'fas fa-house-user'},
        {role: 0, name: "Reportes", to: `/${store.app_roles[0].name}/reportes`, logo: 'far fa-chart-bar'},
        {role: 0, name: "Alarmas", to: `/${store.app_roles[0].name}/alarmas`, logo: 'fas fa-exclamation-triangle'},
        {role: 0, name: "Planificación", to: `/${store.app_roles[0].name}/planificacion`, logo: 'far fa-calendar-alt'},
        //tech links
        {role: 1, name: "Inicio", to: `/${store.app_roles[1].name}`, logo: 'fas fa-home'},
        {role: 1, name: "Mantenimiento", to: `/${store.app_roles[1].name}/mantenimiento`, logo: 'fas fa-home'},
        {role: 1, name: "Mis Reportes", to: `/${store.app_roles[1].name}/reportes`, logo: 'fas fa-home'},
        {role: 1, name: "Alarmas", to: `/${store.app_roles[1].name}/alarmas`, logo: 'fas fa-home'},
        {role: 1, name: "Tareas", to: `/${store.app_roles[1].name}/tareas`, logo: 'fas fa-home'},
    ]

    return (
        <div id="sideNav" className={store.side_bar ? "active":""}>
            <span className="closebtn" onClick={actions.close_sidebar}>&times;</span>
            <div id="role-select" className="btn-group">
                {store.user.roles.map(item => {
                    return (
                        <NavLink 
                            to={`/${store.app_roles[item.role].name}`} 
                            key={item.role} 
                            className="select-item"
                            activeClassName="active"
                            onClick={() => actions.set_role(item.role)}
                            >
                                {item.name}
                        </NavLink>
                    )
                })}
            </div>
            <div className="nav-zone">
                {app_links.map(item => {
                    if (item.role === store.current_role) {
                        return (
                            <NavLink 
                                key={item.to} 
                                to={item.to} 
                                onClick={actions.close_sidebar} 
                                activeClassName="active-nav" 
                                exact
                                >
                                    <i className={item.logo}></i>
                                    <span>{item.name}</span>
                            </NavLink>
                        )
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
}