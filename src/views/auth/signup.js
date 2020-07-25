import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import { Context } from '../../store/appContext';
import { validate_all, validate_field, fb_styles, noSpace } from '../../helper/validations';
import { handleChange } from '../../helper/handlers';
import { solid_icons as icons } from '../../helper/icons';

export const SignUp = () => {

    const {store, actions} = useContext(Context); //global store

    const [state, setState] = useState({ //local Store
        fields: {
            signup_email: {value: "", class: fb_styles.neutral, msg: ""}, // id de todos los campos en el formulario, contiene el input del usuario.
            signup_passw: {value: "", class: fb_styles.neutral, msg: ""},
            signup_repas: {value: "", class: fb_styles.neutral, msg: ""},
            signup_fname: {value: "", class: fb_styles.neutral, msg: ""},
            signup_lname: {value: "", class: fb_styles.neutral, msg: ""}, 
        },
        rq_fields_fb: {
            signup_email: {value: "", class: fb_styles.neutral, msg: ""}
        },
        password_type: "password" // flag para mostrar/ocultar contraseña.
    });
    

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