const validations  = {
    email: (email) => { // cuando el tipo del campo a ser validado es email.
        const reEmail = /\S+@\S+\.\S+/; //expresion regular para verificar email.
        if (reEmail.test(email)) {
            return {valid: true, msg: "ok", class: "valid"}
        } else {
            return {valid: false, msg: "Email inválido", class: "invalid"}
        }
    },
    password: (passw) => { // cuando el tipo del campo a ser validado es password.
        const rePassw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; //expresion regular para verificar contraseña
        passw = typeof(passw) !== 'undefined' ? passw : "invalid";
        if (rePassw.test(passw)) {
            return {valid: true, msg: "ok", class: "valid"}
        } else {
            return {valid: false, msg: "Contraseña inválida", class: "invalid"}
        }
    },
    text: (text) => { // cuando el tipo del campo a ser validado es text.
        if (text !== "" && text !== undefined) {
            return {valid: true, msg: "ok", class: "valid"}
        } else {
            return {valid: false, msg: "Campo requerido", class: "invalid"}
        }
    }
};

export const validate_field = (type, value) => {
    type = typeof(type) !== 'undefined' ? type : "text"; //default type for validations
    value = typeof(value) !== 'undefined' ? value : ""; //default value for validate

    if (type === "email" || type === "password" || type === "text") {
        return validations[type](value);
    } else {
        return {valid: false, msg: "Invalid Field", class:"invalid"}
    }
    // funcion que se encarga de validar a través de type, id (que coincida con los requeridos)
    // y un valor. si id = * se revisa la validación de todos los campos requeridos.

};

const valid_types = ["text", "email", "password"];

export const validate_repass = (pass, repass) => {
    pass = typeof(pass) !== 'undefined' ? pass : "valid";
    repass = typeof(pass) !== 'undefined' ? repass : "invalid";

    if (pass !== repass){
        return {valid: false, msg: "Contraseña no coicide", class: "invalid"}
    } else {
        return {valid: true, msg: "ok", class: "valid"}
    };
};

export const validate_all = (form_id) => { // will return an object with an array of valids and a object of feedback.
    const ele = document.getElementById(form_id);
    let results = [];
    let all_valid = true;

    for (let i = 0; i < ele.length; i++ ) {
        const {type, value, required} = ele[i];

        if (required && valid_types.includes(type)) {
            results[i] = validations[type](value);
            all_valid = all_valid && results[i].valid;
        }
    }
    return({valid: all_valid, results: results});
};
