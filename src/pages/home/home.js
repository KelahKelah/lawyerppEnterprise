import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./home.css";

const Home = (props) => {
  return (
    <div>
      <div className="header jumbotron align-centre text-white">
        <h1 className="text-white">Welcome to Lawyerpp</h1>
        <h4 className="text-white">Click the button below to file a process</h4>
        <Link className="btn btn-primary get-btn" to="/process/fill">
          File a Process
        </Link>
      </div>
    </div>
  );
};
export default Home;
