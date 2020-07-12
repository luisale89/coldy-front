import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import history from './views/history';

import { Dashboard_index } from "./views/dashboard-index";

import { Navbar } from "./component/navbar";

import injectContext from "../src/store/appContext";

//create your first component
export const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	//eslint-disable-next-line
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<Router history={history}>
				<ScrollToTop>
					<Navbar />
                    <div className="grid-container">
                        <div>hola mundo.</div> {/*aquí se renderizará el side-nav con un 25% de ocup*/}
                        <Switch> {/*El resto de los componentes ocupará un 75% del espacio, excepto los dispositivos móviles */}
                            <Route exact path="/" component={Dashboard_index} />
                            <Route render={() => <h1>Not found!</h1>} />
                        </Switch>
                    </div>
				</ScrollToTop>
			</Router>
		</div>
	);
};

export default injectContext(Layout);
