import React, { useContext } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import history from './views/history';
import { Context } from './store/appContext';

//index_view
import { Home } from './views/home';

// * admin Views
import { AdminIndex as A_index} from "./views/administrador/admin-index";
import { Clientes as A_clientes} from "./views/administrador/clientes";

// * Mante Views
import { ManteIndex as M_index } from "./views/mantenedor/mante-index";

// * Auth_Views
import { Login } from "./views/auth/login";
// import { SignUp } from "./views/auth/signup";

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
    // const basename = process.env.BASENAME || "";

    //eslint-disable-next-line
    const {store, actions} = useContext(Context); //global store

    const routes = {
        admin: "/administrador", mante: "/mantenedor"
    };

    if (store.user_logged) {
        return ( //the whole app is protected.
            <Router history={history}>
                <ScrollToTop>
                    <Navbar />
                    <div className="main-container">
                        <Sidebar /> {/*aquí se renderiza el side-nav en todas las vistas*/}
                        <Switch> 
                            {/* admin routes */}
                            <Route exact path="/" component={Home} />
                            <Route exact path={`${routes.admin}`} component={A_index} />
                            <Route path={`${routes.admin}/clientes`} component={A_clientes} />
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
        return ( //Public Views
            <Router history={history}>
                <Switch>
                    <Route path="/ingreso" component ={Login} />
                    {/* <Route path="/registro" component = {SignUp} />  */}
                    <Redirect from="/*" to="/ingreso" />
                </Switch>
            </Router>
        )
    }
};

export default injectContext(Layout);
