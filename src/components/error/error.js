import React, { useState, useEffect } from "react";
import "./error.css";
import error from "../../assets/error1.png";
import { Link } from "react-router-dom";

const Error = (props) => {
  if (props.message == "404" || props.message == "401") {
    return (
      <div className="wrapper">
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className="col-sm-12 text-center">
              <div className="iq-error">
                <h1>Sorry</h1>
                <h4 className="mb-0">{props.advice}</h4>
                <p>The requested page dose not exist.</p>
                <Link className="btn btn-primary mt-3" to={`${props.link}`}>
                  <i className="ri-home-4-line"></i>Go back
                </Link>
                <img src={error} className="img-fluid iq-error-img" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (props.message == "500") {
    return (
      <div className="wrapper">
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className="col-sm-12 text-center">
              <div className="iq-error">
                <h1>404</h1>
                <h4 className="mb-0">Oops! This Page is Not Found.</h4>
                <p>The requested page dose not exist.</p>
                <Link className="btn btn-primary mt-3" to="index-2.html">
                  <i className="ri-home-4-line"></i>Back to Home
                </Link>
                <img src={error} className="img-fluid iq-error-img" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Error;
