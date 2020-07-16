import history from "../views/history";

//eslint-disable-next-line
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            global_role: "",
            user: {
                id: 0,
                fname:"Luis",
                lname:"Lucena",
                company: "Lider Frio",
                roles:[
                    {id:"administrador", name:"Administrador", active: true},
                    {id:"mantenedor", name:"Técnico", active: false}
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
            set_role: (role) => {
                const store = getStore();
                role = typeof(role) !== 'undefined' ? role : store.user.roles[0].id;
                let pass = false;

                const new_roles = store.user.roles.map(item => {
                    if (item.id === role) {
                        pass = true;
                        return {...item, active: true}
                    } else {
                        return {...item, active: false}
                    }
                });
                if (pass) {
                    setStore({global_role: role, roles: new_roles});
                } else {
                    console.log("bad role request!...");
                }
            }
		}
	};
};

export default getState;
