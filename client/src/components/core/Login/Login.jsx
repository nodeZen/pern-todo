import React, { Fragment, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errMessage, setErrMessage] = useState();

  const { email, password } = inputs;

  const onChangeInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = { email, password };
    try {
      const response = await axios.post(
        "http://localhost:3001/user/login",
        body
      );
      if(response.data.token){
        localStorage.setItem("token",response.data.token);
      setAuth(true);
      }else if(response.data.failMessage){
        setErrMessage(response.data.failMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmitForm}>
        <h1 className="text-center my-5">Login</h1>
        <input
          type="text"
          placeholder="Email"
          className="form-control my-3"
          name="email"
          value={email}
          onChange={onChangeInputs}
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="form-control my-3"
          name="password"
          value={password}
          onChange={onChangeInputs}
        ></input>
        {errMessage && (
          <div className="my-3 error-message">{errMessage}</div>
        )}
        <button className="btn btn-success btn-block" type="submit">
          Login
        </button>
        <Link to="/register">Register</Link>
      </form>
    </Fragment>
  );
};

export default Register;
