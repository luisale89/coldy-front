export const handleChange = (event, fields) => { // como inputs tiene el evento del inptu y los campos "fields" del state del componente
    const {value, type, name, checked} = event.target;

        if (type === "checkbox") {
            const new_field = Object.assign(fields, {
                [name]: checked
            });
            return new_field;
        } else {
            const new_field = Object.assign(fields, {
                [name]: value
            });
            return new_field;
        }
}