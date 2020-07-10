const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			fname: 'luis',
			lname: 'lucena'
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
