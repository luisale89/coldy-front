import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import { Context } from '../../store/appContext';
import { validate_all, validate_field, fb_styles, noSpace } from '../../helper/validations';
import { handleChange } from '../../helper/handlers';
import { Icons as icons } from '../../helper/icons';

export const Login = () => {

    const {store, actions} = useContext(Context); //global store

    const [state, setState] = useState({ //local Store
        fields: {
            login_email: "", // id del campo email del formulario, contiene el input del usuario.
            login_passw: "", // id del campo password del formulario, contiene el input del usuario.
            remember_user: false
        },
        rq_fields_fb: { // key de cada objeto debe ser igual al id en constante "required_fields"
            login_email: {class: fb_styles.valid, msg: ""}, // contiene el feedback al usuario.
            login_passw: {class: fb_styles.valid, msg: ""} // contiene el feedback al usuario
        },  
        password_type: "password" // flag para mostrar/ocultar contraseña.
    });

    const handleSubmit = (event) => { //event is the form that submit
        // se realiza validación de todos los requeridos y si todos son validos, se procede con el submit
        event.preventDefault();
        const {valid, feedback} = validate_all(event.target.id, state.rq_fields_fb) // valida todos los campos requeridos del formulario con id

        setState({
            rq_fields_fb: feedback,
            ...state
        });

        if (valid) { // si todos los campos requeridos fueron validados
            const result = actions.loadSomeData(); // envío de formulario a API - Recibe mensajes desde backend y muestra feedback en formulario en caso de algún error.
            console.log(result);
        } else {
            console.log("no cumple");
        };
    };

    const handleInputChange = (event) => { 
        setState({fields: handleChange(event, state.fields), ...state})
        check_field(event);
    };

    const check_field = (event) => {
        setState({rq_fields_fb: validate_field(event, state.rq_fields_fb), ...state});
    }

    return (
        <div id="login-view">
            <div className="login-header">
                {!store.loading_API && <a href="https://app.friotermia.com">Volver a friotermia</a>}
                {/* {!store.loading_API && <Link to="/registro" >¿No tienes cuenta aún?</Link>} */}
            </div>
            <div className="login-body">
                <div className="app-logo">Coldy App</div>
                <form id="login-form" onSubmit={handleSubmit} noValidate autoComplete="on">
                    {/* email field */}
                    <div className="form-group">
                        <label htmlFor="login_email">CORREO ELECTRÓNICO</label>
                        <span className={state.rq_fields_fb.login_email.class}>{icons.solid.exclamation} {state.rq_fields_fb.login_email.msg}</span>
                        <input 
                            type="email" 
                            placeholder="Ingesa tu email" 
                            name="login_email"
                            value={state.fields.login_email || ""}
                            onChange={handleInputChange}
                            onKeyPress={noSpace}
                            onBlur={check_field}
                            disabled={store.loading_API}
                            required
                        />
                    </div>
                    {/* pasword field */}
                    <div className="form-group">
                        <label htmlFor="login_passw">CONTRASEÑA</label>
                        <span className={state.rq_fields_fb.login_passw.class}>{icons.solid.exclamation} {state.rq_fields_fb.login_passw.msg}</span>
                        <input 
                            type={state.password_type} //cambia para mostrar/esconder contraseña ingresada.
                            placeholder="Ingresa tu contraseña" 
                            name="login_passw"
                            value={state.fields.login_passw || ""}
                            onKeyPress={noSpace}
                            onChange={handleInputChange}
                            onBlur={check_field}
                            disabled={store.loading_API}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="checkbox-group">
                        <label>Recuérdame</label>
                        <input 
                            type="checkbox"//cambia para mostrar/esconder contraseña ingresada.
                            name="remember_user"
                            checked = {state.fields.remember_user}
                            onChange = {handleInputChange}
                        />
                    </div>
                    {/* submit button */}
                    <button 
                        className="btn btn-success" 
                        type="submit" 
                        disabled={store.loading_API}>
                            {store.loading_API ? <span>{icons.spin.dots} Cargando</span> : "Iniciar Sesión"}
                    </button>
                </form>
            </div>
            <div className="login-footer"></div>
        </div>
    );
}