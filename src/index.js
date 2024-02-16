import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin";
import { ToastContainer } from "react-toastify";
import NotificationAlert from "react-notification-alert";
import Login from "components/Auth/Login";
import SuperAdminState from "context/admin/SuperAdminState";

const root = ReactDOM.createRoot(document.getElementById("root"));
const notificationAlertRef = React.createRef()
root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/sup-admin" render={(props) => <AdminLayout {...props} />} />
      <SuperAdminState>
      <Route path = '/login' component= {Login} />
      </SuperAdminState>
      <Redirect from="/" to="/sup-admin" />
    </Switch>
  

  </BrowserRouter>
);
