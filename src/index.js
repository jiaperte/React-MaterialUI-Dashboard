/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import SignIn from "pages/LoginPage.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={SignIn} />
        <Route path="/rtl" component={RTL} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
