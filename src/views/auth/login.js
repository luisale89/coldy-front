import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import { Context } from '../../store/appContext';
import { validations } from '../../helper/validations';

export const Login = () => {

    const fb_styles= { // util para mostrar feedback al usuario en los formularios.
        valid: "invalid-tooltip",
        invalid: "invalid-tooltip active",
        neutral: "invalid-tooltip"
    };

    const {store, actions} = useContext(Context); //global store

    const [state, setState] = useState({ //local Store
        fields: {
            login_email: "", // id del campo email del formulario, contiene el input del usuario.
            login_passw: "", // id del campo password del formulario, contiene el input del usuario.
        },
        rq_fields_fb: { // key de cada objeto debe ser igual al id en constante "required_fields"
            login_email: {class: fb_styles.neutral, msg: ""}, // contiene el feedback al usuario.
            login_passw: {class: fb_styles.neutral, msg: ""} // contiene el feedback al usuario
        },  
        password_type: "password" // flag para mostrar/ocultar contraseña.
    });
    
    const required_fields= [ // array de campos requeridos por el formulario y su fn de validación. ID coincide con id del campo
        {id: "login_email", validation: validations.email},
        {id: "login_passw", validation: validations.password}
    ];

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