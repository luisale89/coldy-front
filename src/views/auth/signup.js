import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import { Context } from '../../store/appContext';
import { validate_all, validate_field, fb_styles, noSpace } from '../../helper/validations';
import { handleChange } from '../../helper/handlers';
import { Icons as icons } from '../../helper/icons';

export const SignUp = () => {

    const {store, actions} = useContext(Context); //global store

    const [state, setState] = useState({ //local Store
        fields: {
            signup_email: "", // id del campo email del formulario, contiene el input del usuario.
            signup_passw: "", // id del campo password del formulario, contiene el input del usuario.
            signup_repas: "",
            signup_lname: "",
            signup_fname: ""
        },
        rq_fields_fb: { // key de cada objeto debe ser igual al id en constante "required_fields"
            signup_email: {class: fb_styles.valid, msg: ""}, // contiene el feedback al usuario.
            signup_passw: {class: fb_styles.valid, msg: ""}, 
            signup_repas: {class: fb_styles.valid, msg: ""},
            signup_lname: {class: fb_styles.valid, msg: ""},
            signup_fname: {class: fb_styles.valid, msg: ""}
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
            console.log(feedback)
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
        <div id="signup-view">
            <div className="signup-header">
                {!store.loading_API && <a href="https://app.friotermia.com">Volver a friotermia</a>}
                {!store.loading_API && <Link to="/ingreso" >¿Ya tienes cuenta? ingresa aquí</Link>}
            </div>
            <div className="signup-body">
                <div className="app-logo">Coldy App</div>
                <form id="signup-form" onSubmit={handleSubmit} noValidate autoComplete="on">
                    {/* first name field */}
                    <div className="form-group">
                        <label>NOMBRE</label>
                        <span className={state.rq_fields_fb.signup_fname.class}>{icons.solid.exclamation} {state.rq_fields_fb.signup_fname.msg}</span>
                        <input 
                            type="text" 
                            placeholder="Ingesa tu Nombre" 
                            name="signup_fname"
                            value={state.fields.signup_fname || ""}
                            onChange={handleInputChange}
                            onKeyPress={noSpace}
                            onBlur={check_field}
                            disabled={store.loading_API}
                            required
                        />
                    </div>
                    {/* first name field */}
                    <div className="form-group">
                        <label>APELLIDO</label>
                        <span className={state.rq_fields_fb.signup_lname.class}>{icons.solid.exclamation} {state.rq_fields_fb.signup_lname.msg}</span>
                        <input 
                            type="text" 
                            placeholder="Ingesa tu Apellido" 
                            name="signup_lname"
                            value={state.fields.signup_lname || ""}
                            onChange={handleInputChange}
                            onKeyPress={noSpace}
                            onBlur={check_field}
                            disabled={store.loading_API}
                            required
                        />
                    </div>
                    {/* email field */}
                    <div className="form-group">
                        <label>CORREO ELECTRÓNICO</label>
                        <span className={state.rq_fields_fb.signup_email.class}>{icons.solid.exclamation} {state.rq_fields_fb.signup_email.msg}</span>
                        <input 
                            type="email" 
                            placeholder="Ingesa tu email" 
                            name="signup_email"
                            value={state.fields.signup_email || ""}
                            onChange={handleInputChange}
                            onKeyPress={noSpace}
                            onBlur={check_field}
                            disabled={store.loading_API}
                            required
                        />
                    </div>
                    {/* pasword field */}
                    <div className="form-group">
                        <label>CONTRASEÑA</label>
                        <span className={state.rq_fields_fb.signup_passw.class}>{icons.solid.exclamation} {state.rq_fields_fb.signup_passw.msg}</span>
                        <input 
                            type={state.password_type} //cambia para mostrar/esconder contraseña ingresada.
                            placeholder="Ingresa tu contraseña" 
                            name="signup_passw"
                            value={state.fields.signup_passw || ""}
                            onKeyPress={noSpace}
                            onChange={handleInputChange}
                            onBlur={check_field}
                            disabled={store.loading_API}
                            autoComplete="off"
                            required
                        />
                    </div>
                    {/* pasword field */}
                    <div className="form-group">
                        <label>REPITE TU CONTRASEÑA</label>
                        {/* <span className={state.rq_fields_fb.signup_repas.class}>{icons.solid.exclamation} {state.rq_fields_fb.signup_repas.msg}</span> */}
                        <input 
                            type= "password"
                            placeholder="Repite tu contraseña" 
                            name="signup_repas"
                            value={state.fields.signup_repas || ""}
                            onKeyPress={noSpace}
                            onChange={handleInputChange}
                            onBlur={check_field}
                            disabled={store.loading_API}
                            autoComplete="off"
                        />
                    </div>
                    {/* submit button */}
                    <button 
                        className="btn btn-success" 
                        type="submit" 
                        disabled={store.loading_API}>
                            {store.loading_API ? <span>{icons.spin.dots} Cargando</span> : "Registrarme"}
                    </button>
                </form>
            </div>
            <div className="signup-footer"></div>
        </div>
    );
}