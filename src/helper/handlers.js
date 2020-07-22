export const handleChange = (event, fields) => { // como inputs tiene el evento del inptu y los campos "fields" del state del componente
    const {value, type, name, checked} = event.target;

        if (type === "checkbox") {
            return Object.assign(fields, {
                [name]: checked
            });
        } else {
            return Object.assign(fields, {
                [name]: value
            });
        }
}