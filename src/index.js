import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import * as serviceWorker from './serviceWorker';

//include your index.scss file into the bundle
import "./styles/index.scss";
import "./fontawesome";

// import "./styles/dashboard-main.scss";

//include custom javascript code
// import "./websocket/test.js";

ReactDOM.render(<Layout />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
