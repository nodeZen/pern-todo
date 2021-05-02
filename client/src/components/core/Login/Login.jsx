import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { loginService } from "../../../services/auth-services";
import { useDispatch, useSelector } from "react-redux";
const Register = () => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const errMessage = useSelector((state) => state.auth.errMessage);

  const { email, password } = inputs;

  const onChangeInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = { email, password };
    dispatch(loginService(body));
  };

  return (
    <Fragment>
      <form onSubmit={onSubmitForm}>
        <h1 className="text-center my-5">Pern ToDo Login</h1>
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
        {errMessage && <div className="my-3 error-message">{errMessage}</div>}
        <button className="btn btn-success btn-block" type="submit">
          Login
        </button>
        <div className="my-3">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </Fragment>
  );
};

export default Register;
