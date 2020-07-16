import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import history from './views/history';

// * admin Views
import { AdminIndex } from "./views/administrador/admin-index";

// * Mante Views

// * Auth_Views
import { Login } from "./views/auth/login";
import { SignUp } from "./views/auth/signup";

// ! not-found View
import { NotFound } from "./views/notFound";

// ? components
import { Navbar } from "./component/navbar";
import { Sidebar } from "./component/sidebar";

import injectContext from "../src/store/appContext";

//create your first component
export const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	//eslint-disable-next-line
	const basename = process.env.BASENAME || "";

    if (window.sessionStorage.getItem("a_token") !== null || window.localStorage.getItem("a_token") !== null) {
        return ( //protected Views
            <Router history={history}>
                <ScrollToTop>
                    <Navbar />
                    <div className="main-container">
                        <Sidebar /> {/*aquí se renderiza el side-nav en todas las vistas*/}
                        <Switch> 
                            <Route exact path="/administrador" component={AdminIndex} />
                            <Route render={() => <NotFound />} />
                        </Switch>
                    </div>
                </ScrollToTop>
            </Router>
        );
    } else {
        return ( //unprotected views
            <Router history={history}>
                <div className="main-container">
                    <Switch>
                        <Route path="/login" component ={Login} />
                        <Route path="/sign-in" component={SignUp} />
                        <Redirect from="/*" to ="/login" />
                    </Switch>
                </div>
            </Router>
        )
    }
    
};

export default injectContext(Layout);
