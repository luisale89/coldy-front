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
            return {valid: false, feedback: {class: fb_styles.invalid, msg: "email inválido"}}
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
    text: (text) => { // cuando el tipo del campo a ser validado es text.
        const reText = /[^a-zA-Z -]/; //sin caracteres especiales
        if (text.trim() === "") {
            return {valid: false, feedback: {msg: "Completa este campo", class: fb_styles.invalid}}
        } else if (reText.test(text)){
            return {valid: false, feedback: {msg: "Inválido", class: fb_styles.invalid}}
        } else {
            return {valid: false, feedback: {msg: "ok", class: fb_styles.valid}}
        }
    }
};

export const validate_field = (type, value) => {
    type = typeof(type) !== 'undefined' ? type : "text"; //default type for validations
    value = typeof(value) !== 'undefined' ? value : ""; //default value for validate

    if (valid_types.includes(type)) {
        return validations[type](value);
    }
};

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
    let feedback = {};
    let all_valid = true;

    for (let i = 0; i < ele.length; i++ ) {
        const {id, type, value, required} = ele[i];

        if (required && valid_types.includes(type)) {
            const rev = validations[type](value);
            feedback[id] = rev.feedback;
            all_valid = all_valid && rev.valid;
        }
    }
    return({valid: all_valid, feedback: feedback});
};
