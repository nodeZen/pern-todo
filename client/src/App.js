import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Login from "./components/core/Login/Login";
import Register from "./components/core/Register/Register";
import Dashboard from "./components/core/Dashboard/Dashboard";

import { isUserAuthenticated } from "./services/auth-services";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserAuthenticated());
  }, [dispatch]);

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =><Redirect to="/dashboard" />}
            />
            <Route
              exact
              path="/login"
              render={(props) =>
                isAuthenticated ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Login {...props} />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                isAuthenticated ? (
                  <Redirect to="/login" />
                ) : (
                  <Register {...props} />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
