import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "./Register.scss";
import validator from "validator";
import { registerService } from "../../../services/auth-services";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage } from "../../../store/auth-slice";

const Register = () => {
  const [inputs, setInputs] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const errMessage = useSelector((state) => state.auth.errMessage);

  const { email, password, userName } = inputs;

  const onChangeInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = { userName, email, password };
    if (validator.isEmail(email)) {
      if (userName.length && password.length) {
        dispatch(registerService(body));
      } else {
        dispatch(setErrorMessage("Please fill in all fields"));
      }
    } else {
      dispatch(setErrorMessage("Invalid email id"));
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmitForm}>
        <h1 className="text-center my-5">Pern ToDo Register</h1>
        <input
          type="text"
          placeholder="User Name"
          className="form-control my-3"
          name="userName"
          value={userName}
          onChange={onChangeInputs}
        ></input>
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
          Register
        </button>
        <div className="my-3">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </Fragment>
  );
};

export default Register;
