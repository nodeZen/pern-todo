import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Todo from "./Todo/Todo";
import "./Dashboard.scss";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [id,setId]=useState("");
  
  const getData = async () => {
    const response = await axios.get("/user/user-data", {
      headers: {
        token: localStorage.token,
      },
    });

    setName(response.data.user_name);
    setId(response.data.user_id);
  };

  useEffect(() => {
    getData();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

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
      <Todo userId={id}/>
    </Fragment>
  );
};

export default Dashboard;
