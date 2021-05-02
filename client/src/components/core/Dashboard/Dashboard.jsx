import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Todo from "./Todo/Todo";
import "./Dashboard.scss";
import { setAuthentication } from "../../../store/auth-slice";
import { getUserData } from "../../../services/auth-services";

const Dashboard = () => {
  const name = useSelector((state) => state.auth.userName);
  const id = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setAuthentication(false));
  };

  useEffect(() => {
    dispatch(getUserData());
  });

  return (
    <Fragment>
      <div className="header-bar row">
        <h1 className="col-md-11">Pern To-Do</h1>
        <div className="col-md-1">
          <button
            className="btn btn-warning logout-button"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
      <h2 className="my-3 text-center">Hi {name}</h2>
      <Todo userId={id} />
    </Fragment>
  );
};

export default Dashboard;
