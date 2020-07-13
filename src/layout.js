import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import history from './views/history';

import { Dashboard_index } from "./views/dashboard-index";
import { NotFound } from "./views/notFound";

import { Navbar } from "./component/navbar";
import { Sidebar } from "./component/sidebar";

import injectContext from "../src/store/appContext";

//create your first component
export const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	//eslint-disable-next-line
	const basename = process.env.BASENAME || "";

	return (
        <Router history={history}>
            <ScrollToTop>
                <Navbar />
                <div className="main-container">
                    <Sidebar /> {/*aquí se renderiza el side-nav en todas las vistas*/}
                    <Switch> 
                        <Route exact path="/" component={Dashboard_index} />
                        <Route render={() => <NotFound />} />
                    </Switch>
                </div>
            </ScrollToTop>
        </Router>
	);
};

export default injectContext(Layout);
