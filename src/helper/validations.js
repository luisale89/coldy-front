export const fb_styles= { // util para mostrar feedback al usuario en los formularios.
    valid: "invalid-tooltip",
    invalid: "invalid-tooltip active"
};

const valid_types = ["text", "email", "password"];

const validations  = {
    email: (email) => { // cuando el tipo del campo a ser validado es email.
        const reEmail = /\S+@\S+\.\S+/; //expresion regular para verificar email.
        if (reEmail.test(email)) {
            return {valid: true, feedback: {class: fb_styles.valid, msg: "Ok"}}
        } else {
            return {valid: false, feedback: {class: fb_styles.invalid, msg: "Email inválido"}}
        }
    },
    password: (passw) => { // cuando el tipo del campo a ser validado es password.
        const rePassw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; //expresion regular para verificar contraseña
        passw = typeof(passw) !== 'undefined' ? passw : "invalid";

        if (rePassw.test(passw)) {
            return {valid: true, feedback: {class: fb_styles.valid, msg: "Ok"}}
        } else {
            return {valid: false, feedback: {class: fb_styles.invalid, msg: "Contraseña inválida"}}
        }
    },
    text: (text) => { // cuando el tipo del campo a ser validado es texto.(sin caracteres especiales)
        const reText = /[^a-zA-Z -]/; //sin caracteres especiales
        
        if (reText.test(text)){
            return {valid: false, feedback: {msg: "Caracter especial", class: fb_styles.invalid}}
        } else {
            return {valid: false, feedback: {msg: "ok", class: fb_styles.valid}}
        }
    }
};

export const validate_field = (type, value) => {
    type = typeof(type) !== 'undefined' ? type : "text"; //default type for validations
    value = typeof(value) !== 'undefined' ? value : ""; //default value for validate

    if (!valid_types.includes(type)) {
        return {valid: false, feedback: {class: fb_styles.invalid, msg: "bug: invalid type"}}
    } else if (value.trim() === "") {
        return {valid: false, feedback: {class: fb_styles.invalid, msg: "Campo requerido"}}
    } else {
        return validations[type](value);
    }
};

export const validate_all = (form_id) => { // will return an object with a valid flag and a object of feedback.
    const ele = document.getElementById(form_id);
    let feedback = {};
    let all_valid = true;

    for (let i = 0; i < ele.length; i++ ) {

        const {id, type, value, required} = ele[i]; //se desestructura cada elemento del formulario.

        if (required) {
            if (value.trim() === "") { // si el campo está vacío:
                feedback[id] = {class: fb_styles.invalid, msg: "Campo Requerido"};
                all_valid = false;
            } else if (!valid_types.includes(type)) { // si el tipo del campo es inválido -> bug
                feedback[id] = {class: fb_styles.invalid, msg: "bug: invalid type"};
                all_valid = false;
            } else { // se ejecuta validación del campo.
                const rev = validations[type](value);
                feedback[id] = rev.feedback;
                all_valid = all_valid && rev.valid;
            }
        }
    }
    return({valid: all_valid, feedback: feedback});
};

export const noSpace = (event) => {
    if (event.charCode === 32) {
        event.preventDefault();
    }
}