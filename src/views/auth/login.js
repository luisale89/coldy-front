import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import { Context } from '../../store/appContext';
import { validations } from '../../helper/validations';
import { useState } from 'react';

export const Login = () => {

    const {store, actions} = useContext(Context); //global store

    const [state, setState] = useState({ //local Store
        fields: {
            login_email: "", // id del campo email del formulario
            login_passw: "", // id del campo password del formulario
        },
        rq_fields_fb: { // key de cada objeto debe ser igual al id en constante "required_fields"
            login_email: {class: fb_styles.neutral, msg: ""},
            login_passw: {class: fb_styles.neutral, msg: ""}
        },  
        password_visible: pass_field.hide // flag para mostrar/ocultar contraseña.
    });
    
    const required_fields= [ // array de campos requeridos por el formulario y su fn de validación. ID coincide con id del campo
        {id: "login_email", validation: validations.email},
        {id: "login_passw", validation: validations.password}
    ];

    const fb_styles= { // util para mostrar feedback al usuario en los formularios.
        valid: "valid",
        invalid: "invalid",
        neutral: "neutral"
    };

    const pass_field = { // Estilos para mostrar u ocultar contraseñas
        show: "text",
        hide: "password"
    };


    const check_valid = (type, id, value) => { 
        // funcion que se encarga de validar a través de type, id (que coincida con los requeridos)
        // y un valor.
        let fb = state.rq_fields_fb;
        required_fields.forEach((item) => { 
            if (id === item.id) { // revisa si el campo necesita validación
                const check = validations[type](value); // se realiza la validación.
                if (check !== undefined) {
                    fb = Object.assign(state.rq_fields_fb, {
                        [id]: {class: fb_styles[check.class], msg: check.msg}
                    });
                };
            };
        });
        return fb;
    };

    const handleSubmit = (event) => { 
        // se realiza validación de todos los requeridos y si todos son validos, se procede con el submit
        event.preventDefault();
        let new_fb = state.rq_fields_fb;

        const fb_val = required_fields.map((item) => {
            const check = item.validation(state.fields[item.id]);
            new_fb = Object.assign(state.rq_fields_fb, {
                [item.id]: {class: fb_styles[check.class], msg: check.msg}
            });
            return check.valid;
        });
        setState({
            rq_fields_fb: new_fb,
            ...state
        });
        if (fb_val.includes(false)) { // si uno de los campos no es válido no permite el envío de form a API
            console.log("no cumple");
        } else {
            actions.loadSomeData(); // envío de formulario a API - Recibe mensajes desde backend y muestra feedback en formulario en caso de algún error.
        };
    };

    const handleChange = (event) => { 
        // función que guarda y valida los inputs del usuario, además realiza validación
        //con cada cambio del input.
        const new_field = Object.assign(state.fields, {
            [event.target.id]: event.target.value
        });
        const new_fb = check_valid(event.target.type, event.target.id, event.target.value); // se llama a la función de validacion según el tipo del campo que genero el evento.
        
        setState({
            fields: new_field,
            rq_fields_fb: new_fb,
            ...state
        });
    };

    const valid_on_blur = (event) => {
        //Función que valida al salir del foco de un input (OnFocusOut)
        const new_fb = check_valid(event.target.type, event.target.id, event.target.value); // revisa validación del campo según el tipo

        setState({
            rq_fields_fb: new_fb,
            ...state
        });
    }

    const show_password = () => {
        //Función que cambia tipo del input para el password, para poder mostrar los caracteres
        const new_vis = Object.assign(state, {
            password_visible: pass_field.show
        });
        setState({
            password_visible: new_vis,
            ...state
        });
    };

    const hide_password = () => {
        //Función que cambia tipo del input para el password, para poder mostrar los caracteres
        const new_vis = Object.assign(state, {
            password_visible: pass_field.hide
        });
        setState({
            password_visible: new_vis,
            ...state
        });
    };

    return (
        <div>
            <h1>Login _Page</h1>
            <Link to="/registro" >Regístrate</Link>
        </div>
    );
}