import React from "react";
import "./success.css";
import { Link } from "react-router-dom";

const Success = (props) => {
  const mystyle = {
    borderRadius: "200px",
    height: "200px",
    width: "200px",
    background: "#F8FAF5",
    margin: "0 auto",
  };
  if (props.type === "filedProcess")
    return (
      <div className="body">
        <div className="card">
          <div style={mystyle}>
            <i className="checkmark">✓</i>
          </div>
          <h1>Success</h1>
          <p>
            {props.message};
            <br /> Click <Link to={`${props.link}`}>here</Link> to view{" "}
            {props.direction} or click <Link to="/home">here</Link> to go back
            home!
          </p>
        </div>
      </div>
    );
  if (props.type === "createdCourt")
    return (
      <div className="body">
        <div className="card">
          <div style={mystyle}>
            <i className="checkmark">✓</i>
          </div>
          <h1>Success</h1>
          <p>
            {props.message};
            <br /> Click <Link to={`${props.link}`}>here</Link> to view{" "}
            {props.direction} or click <Link to="/home">here</Link> to go back
            home!
          </p>
        </div>
      </div>
    );
  if (props.type === "costed")
    return (
      <div className="body">
        <div className="card">
          <div style={mystyle}>
            <i className="checkmark">✓</i>
          </div>
          <h1>Success</h1>
          <p>
            {props.message};
            <br /> Click <Link to={`${props.link}`}>here</Link> to view{" "}
            {props.direction} or click <Link to="/home">here</Link> to go back
            home!
          </p>
        </div>
      </div>
    );
    if (props.type === "assignedLawyer")
      return (
        <div className="body">
          <div className="card">
            <div style={mystyle}>
              <i className="checkmark">✓</i>
            </div>
            <h1>Success</h1>
            <p>
              {props.message};
              <br /> Click <Link to={`${props.link}`}>here</Link> to view{" "}
              {props.direction} or click <Link to="/home">here</Link> to go back
              home!
            </p>
          </div>
        </div>
      );
      if (props.type === "paid")
        return (
          <div className="body">
            <div className="card">
              <div style={mystyle}>
                <i className="checkmark">✓</i>
              </div>
              <h1>Success</h1>
              <p>
                {props.message};
                <br /> Click <Link to={`${props.link}`}>here</Link> to view{" "}
                {props.direction} or click <Link to="/home">here</Link> to go
                back home!
              </p>
            </div>
          </div>
        );
      if (props.type === "createdOrg")
        return (
          <div className="body">
            <div className="card">
              <div style={mystyle}>
                <i className="checkmark">✓</i>
              </div>
              <h1>Success</h1>
              <p>
                {props.message};
                <br /> Click <Link to={`${props.link}`}>here</Link> to view{" "}
                {props.direction} or click <Link to="/home">here</Link> to go
                back home!
              </p>
            </div>
          </div>
        );
};

export default Success;
