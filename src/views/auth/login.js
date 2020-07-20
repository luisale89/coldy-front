import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import { Context } from '../../store/appContext';
import { validate_all, validate_field, fb_styles } from '../../helper/validations';

export const Login = () => {

    const {store, actions} = useContext(Context); //global store

    const [state, setState] = useState({ //local Store
        fields: {
            login_email: "", // id del campo email del formulario, contiene el input del usuario.
            login_passw: "", // id del campo password del formulario, contiene el input del usuario.
        },
        rq_fields_fb: { // key de cada objeto debe ser igual al id en constante "required_fields"
            login_email: {class: fb_styles.valid, msg: ""}, // contiene el feedback al usuario.
            login_passw: {class: fb_styles.valid, msg: ""} // contiene el feedback al usuario
        },  
        password_type: "password" // flag para mostrar/ocultar contraseña.
    });

    const handleSubmit = (event) => { 
        // se realiza validación de todos los requeridos y si todos son validos, se procede con el submit
        event.preventDefault();

        const valid_form = validate_all(event.target.id); // se validan todos los campos del formulario.
        const new_fb = Object.assign(state.rq_fields_fb, valid_form.feedback);

        setState({
            rq_fields_fb: new_fb,
            ...state
        });

        if (valid_form.valid) { // si todos los campos requeridos fueron validados
            const result = actions.loadSomeData(); // envío de formulario a API - Recibe mensajes desde backend y muestra feedback en formulario en caso de algún error.
            console.log(result);
        } else {
            console.log("no cumple");
        };
    };

    const handleChange = (event) => { 
        // función que guarda y valida los inputs del usuario, además realiza validación
        //con cada cambio del input.
        const {id, value} = event.target;

        const new_field = Object.assign(state.fields, {
            [id]: value
        });

        setState({
            fields: new_field,
            ...state
        });

        check_field(event); //hace validación del campo con el nuevo valor.
    };

    const check_field = (event) => {
        //Función que valida al salir del foco de un input (OnFocusOut)
        const {id, type, value} = event.target;

        const new_fb = Object.assign(state.rq_fields_fb, {
            [id]: validate_field(type, value).feedback
        })
        setState({
            rq_fields_fb: new_fb,
            ...state
        });
    }

    return (
        <div id="login-view">
            <div className="login-header">
                {!store.loading_API && <a href="https://app.friotermia.com">Volver a friotermia</a>}
                {/* {!store.loading_API && <Link to="/registro" >¿No tienes cuenta aún?</Link>} */}
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
                            onBlur={check_field}
                            disabled={store.loading_API}
                            autoComplete="true"
                            required={true}
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
                            onBlur={check_field}
                            disabled={store.loading_API}
                            required={true}
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