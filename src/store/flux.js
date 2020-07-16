//eslint-disable-next-line
import history from "../views/history";

//eslint-disable-next-line
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            app_roles: [
                {id: 0, name: "administrador"},
                {id: 1, name: "mantenedor"},
                {id: 2, name: "cliente"}
            ],
            current_role: 0,
            user: {
                id: 0,
                fname:"Luis",
                lname:"Lucena",
                company: "Lider Frio",
                roles:[
                    {role: 0, name:"Administrador"},
                    {role: 1, name:"Técnico"}
                ]
            },
            side_bar: false // tag para mostrar/ocultar sidebar desde el navbar.
		},
		actions: {
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				console.log("data-loaded")
            },
            close_sidebar: () => {
                setStore({side_bar: false})
            },
            open_sidebar: () => {
                setStore({side_bar: true});
            },
            set_role: (role) => { // establece el rol global de la app para las configuraciones.
                const store = getStore();
                role = typeof(role) !== 'undefined' ? role : store.user.roles[0].role;

                store.user.roles.forEach(item => {
                    if (item.role === role) {
                        setStore({current_role: role});
                    }
                });
            }
		}
	};
};

export default getState;
