export const validations  = {
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
    },
    re_passw: (pass, repass) => {
        if (pass === "") {
            return {valid: false, msg: "Campo requerido", class: "invalid"}
        } else if (pass !== repass){
            return {valid: false, msg: "Contraseña no coicide", class: "invalid"}
        } else {
            return {valid: true, msg: "ok", class: "valid"}
        };
    }
};