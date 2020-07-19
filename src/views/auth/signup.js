import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import { Context } from '../../store/appContext';
import { validations } from '../../helper/validations';

export const SignUp = () => {

    const fb_styles= { // util para mostrar feedback al usuario en los formularios.
        valid: "invalid-tooltip",
        invalid: "invalid-tooltip active",
        neutral: "invalid-tooltip"
    };

    const {store, actions} = useContext(Context); //global store

    const [state, setState] = useState({ //local Store
        fields: {
            signup_email: {value: "", class: fb_styles.neutral, msg: ""}, // id de todos los campos en el formulario, contiene el input del usuario.
            signup_passw: {value: "", class: fb_styles.neutral, msg: ""},
            signup_repas: {value: "", class: fb_styles.neutral, msg: ""},
            signup_fname: {value: "", class: fb_styles.neutral, msg: ""},
            signup_lname: {value: "", class: fb_styles.neutral, msg: ""}, 
        },
        password_type: "password" // flag para mostrar/ocultar contraseña.
    });
    
    const required_fields= [ // array de campos requeridos por el formulario y su fn de validación. ID coincide con id del campo
        {id: "signup_email", type="email"},
        {id: "signup_passw", type="password"},
        {id: "signup_fname", type="text"},
        {id: "signup_lname", type="text"}
    ];

    const check_valid = (type, id, value) => { 
        // funcion que se encarga de validar a través de type, id (que coincida con los requeridos)
        // y un valor. si id = * se revisa la validación de todos los campos requeridos.
        let fb = state.rq_fields_fb;
        let check = {};
        required_fields.forEach((item) => { 
            if (id === item.id) { // revisa si el campo necesita validación
                if (id.includes("repas")) {
                    check = validations.re_passw(state.fields.signup_passw, value);
                } else {
                    check = validations[type](value)
                };
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
            const result = actions.loadSomeData(); // envío de formulario a API - Recibe mensajes desde backend y muestra feedback en formulario en caso de algún error.
            console.log(result);
        };
    };

    const handleChange = (event) => { 
        // función que guarda y valida los inputs del usuario, además realiza validación
        //con cada cambio del input.
        const new_field = Object.assign(state.fields, {
            [event.target.id]: event.target.value
        });
        const new_fb = validations.check_valid_field(event.target.type, event.target.value)
        
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

    // const show_password = () => {
    //     //Función que cambia tipo del input para el password, para poder mostrar los caracteres
    //     const new_vis = Object.assign(state, {
    //         password_visible: pass_field.show
    //     });
    //     setState({
    //         password_visible: new_vis,
    //         ...state
    //     });
    // };

    // const hide_password = () => {
    //     //Función que cambia tipo del input para el password, para poder mostrar los caracteres
    //     const new_vis = Object.assign(state, {
    //         password_visible: pass_field.hide
    //     });
    //     setState({
    //         password_visible: new_vis,
    //         ...state
    //     });
    // };

    return (
        <div id="login-view">
            <div className="login-header">
                {!store.loading_API && <a href="https://app.friotermia.com">Volver a friotermia</a>}
                {!store.loading_API && <Link to="/registro" >¿No tienes cuenta aún?</Link>}
            </div>
            <div className="login-body">
                <div className="app-logo">Coldy App</div>
                <form id="login-form" onSubmit={handleSubmit} noValidate>
                    {/* email field */}
                    <div className="form-group">
                        <label htmlFor="login_email">CORREO ELECTRÓNICO</label>
                        <span className={state.rq_fields_fb.login_email.class}><i className="fas fa-exclamation-triangle"></i> {state.rq_fields_fb.login_email.msg}</span>
                        <input 
                            type="email" 
                            placeholder="Ingesa tu email" 
                            id="login_email"
                            value={state.fields.login_email || ""}
                            onChange={handleChange}
                            onBlur={valid_on_blur}
                            disabled={store.loading_API}
                            autoComplete="true"
                            required
                        />
                    </div>
                    {/* pasword field */}
                    <div className="form-group">
                        <label htmlFor="login_passw">CONTRASEÑA</label>
                        <span className={state.rq_fields_fb.login_passw.class}><i className="fas fa-exclamation-triangle"></i> {state.rq_fields_fb.login_passw.msg}</span>
                        <input 
                            type={state.password_type} //cambia para mostrar/esconder contraseña ingresada.
                            placeholder="Ingresa tu contraseña" 
                            id="login_passw"
                            value={state.fields.login_passw || ""}
                            onChange={handleChange}
                            onBlur={valid_on_blur}
                            disabled={store.loading_API}
                            required
                        />
                    </div>
                    {/* submit button */}
                    <button 
                        className="btn btn-success" 
                        type="submit" 
                        disabled={store.loading_API}>
                            {store.loading_API ? <span>Cargando <i className='fas fa-spinner fa-spin'></i></span> : "Iniciar Sesión"}
                    </button>
                </form>
            </div>
            <div className="login-footer"></div>
        </div>
    );
}