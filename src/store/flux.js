//eslint-disable-next-line
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            global_role: "admin",
            user: {
                id: 0,
                fname:"Luis",
                lname:"Lucena",
                company: "Lider Frio",
                roles:[
                    {id:"admin", name:"Administrador", active: true},
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
                role = typeof(role) !== 'undefined' ? role : store.roles[0].id;

                const new_roles = store.roles.map(item => {
                    if (item.id === role) {
                        pass = true;
                        return {...item, active: true}
                    } else {
                        return {...item, actve: false}
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
