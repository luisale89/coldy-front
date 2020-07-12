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
            }
		},
		actions: {
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				console.log("data-loaded")
			}
		}
	};
};

export default getState;
