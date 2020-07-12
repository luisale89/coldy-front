import React from 'react';
// import { Context } from '../store/appContext';
import {NavLink} from 'react-router-dom';

export const SideNav = () => {

    const nav_links = [
        {name:"Dashboard", to: "/"},
        {name:"Equipos", to: "/equipos"},
        {name:"Reportes", to: "/reportes"},
        {name:"gastos", to: "/gastos"},
        {name:"planificación", to:"/planificación"}
    ];

    return (
        <div>sideNav</div>
    )
}