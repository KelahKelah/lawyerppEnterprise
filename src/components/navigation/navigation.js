import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import "./navigation.css";
import { FaHome, FaAngleDown } from "react-icons/fa";

const Navigation = (props) => {
  const logOut = () => {
    localStorage.removeItem("userData");
    console.log(localStorage);
    props.history.push("/login");
  };

  return (
    <div className="sticky-top">
      <div className="d-flex justify-content-center mb-3 nav-wrapper dropdown">
        <div className="py-3 px-5 dropdown link-content">
          <Link className="text-black-50 text-decoration-none" to="/home">
            <FaHome /> Home
          </Link>
        </div>

        <div className="py-3 px-5 dropdown link-content">
          <Link
            className="text-black-50 text-decoration-none"
            to="/Court"
            data-toggle="dropdown"
          >
            Court <FaAngleDown />
          </Link>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link className="dropdown-item" to="/create/court">
              Create Court
            </Link>
            <Link className="dropdown-item" to="/courts">
              View Courts
            </Link>
            <Link className="dropdown-item" to="/process/cost">
              Cost Process
            </Link>
            <Link className="dropdown-item" to="/assign/lawyer">
              Assign Judge
            </Link>
            <Link className="dropdown-item" to="/create/organization">
              Create Organization
            </Link>
            <Link className="dropdown-item" to="/view/organization">
              View Organizations
            </Link>
          </div>
        </div>
        <div className="py-3 px-5 dropdown link-content">
          <NavLink
            className="text-black-50 text-decoration-none link-content"
            to="/File_Process"
            data-toggle="dropdown"
          >
            Client <FaAngleDown />
          </NavLink>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link className="dropdown-item" to="/process/fill">
              {" "}
              File a Process
            </Link>
            <Link className="dropdown-item" to="/process/view">
              View Filed Processes
            </Link>
            <Link className="dropdown-item" to="/process/pay">
              Payment
            </Link>
          </div>
        </div>
        <div className="py-3 px-5 dropdown link-content">
          <Link className="text-black-50 text-decoration-none" onClick={logOut}>
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Navigation);
