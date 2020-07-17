import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import history from './views/history';

// * admin Views
import { AdminIndex as A_index} from "./views/administrador/admin-index";
import { Clientes as A_clientes} from "./views/administrador/clientes";

// * Mante Views
import { ManteIndex as M_index } from "./views/mantenedor/mante-index";

// * Auth_Views
import { Login } from "./views/auth/login";

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
    
    const logged = window.localStorage.getItem("a_token");

    const routes = {
        admin: "/administrador", mante: "/mantenedor"
    };

    if (logged) {
        return ( //the whole app is protected.
            <Router history={history}>
                <ScrollToTop>
                    <Navbar />
                    <div className="main-container">
                        <Sidebar /> {/*aquí se renderiza el side-nav en todas las vistas*/}
                        <Switch> 
                            {/* admin routes */}
                            <Route exact path={`${routes.admin}`} component={A_index} />
                            <Route path={`${routes.admin}/clientes`} component={A_clientes}/>
                            {/* mant. routes */}
                            <Route exact path={`${routes.mante}`} component={M_index} />
                            {/* not found */}
                            <Route render={() => <NotFound />} />
                        </Switch>
                    </div>
                </ScrollToTop>
            </Router>
        );
    } else {
        return ( //
            <Router history={history}>
                <div className="main-container">
                    <Switch>
                        <Route path="/" component ={Login} /> {/*all url return this page that will redirect the user to: www.auth.friotermia.com after 3 seconds of "validating the sesion"*/}
                    </Switch>
                </div>
            </Router>
        )
    }
};

export default injectContext(Layout);
