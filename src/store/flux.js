//eslint-disable-next-line
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            user: {
                fname:"Luis",
                lname:"Lucena",
                company: "Lider Frio",
                roles:[
                    {name:"Técnico", active: true},
                    {name:"Administrador", active: false}
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
            }
		}
	};
};

export default getState;
