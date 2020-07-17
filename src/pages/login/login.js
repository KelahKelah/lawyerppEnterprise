import React, { useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/loader";
import { withRouter } from "react-router";
import "./login.css";

const Login = (props) => {
  const [userLogin, setuserLogin] = useState({
    email_address: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState("no");
  const handleChange = (event) => {
    setuserLogin({
      ...userLogin,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userLogin);
    setisLoading("yes");
    axios
      .post(
        "https://lawyerppserver.herokuapp.com/api/auth/authenticate",
        userLogin
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        axios.defaults.headers['x-access-token'] = response.data.data.token;
        props.history.push("/home");
      })
      .catch((error) => {
        setisLoading("error");
        console.log(error);
      });
  };
  return (
    <div>
      <section className="sign-in-page bg-white">
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className="col-sm-6 align-self-center">
              <div className="sign-in-from">
                <h1 className="mb-0">Log in</h1>
                <p>Enter your email address and password to log in.</p>
                <form className="mt-4" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control mb-0"
                      name="email_address"
                      placeholder="Enter email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      className="form-control mb-0"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-inline-block w-100">
                    <button
                      type="submit"
                      className="btn btn-primary float-right"
                    >
                      Sign in
                    </button>
                    {isLoading === "yes" ? (
                      <Loader />
                    ) : isLoading === "error" ? (
                      <small>Something went wrong, refresh</small>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="login-image"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default withRouter(Login);
