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
					<Switch>
						<Route exact path="/" component={Dashboard_index} />
						<Route render={() => <h1>Not found!</h1>} />
					</Switch>
				</ScrollToTop>
			</Router>
		</div>
	);
};

export default injectContext(Layout);
