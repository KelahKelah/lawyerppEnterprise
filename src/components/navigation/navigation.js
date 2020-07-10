import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import './navigation.css';
import { Home, FaHome, FaAngleDown, FaAngleRight } from 'react-icons/fa';

const Navigation = (props) => {
  const [toggle, setToggle] = useState({ FaAngleDown })

  const changeToggle = () => {
    setToggle({ FaAngleRight })
  }
  
  const logOut = () => {
    localStorage.removeItem("userData");
    props.history.push("/login");
  }

  return (
    <div className="sticky-top">
      <div className="d-flex justify-content-center mb-3 nav-wrapper dropdown">
        <div className="py-3 px-5 dropdown link-content">
          <Link
            className="text-black-50 text-decoration-none"
            data-toggle="dropdown"
          >
            <FaHome /> Home <FaAngleDown />
          </Link>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="/home">
              Home
              </a>
            <a className="dropdown-item" onClick={logOut}>
              Log Out
              </a>
          </div>
        </div>
        <div className='py-3 px-5 dropdown link-content'>
          <NavLink className='text-black-50 text-decoration-none link-content' to='/File_Process' data-toggle="dropdown">Client Processes<FaAngleDown onClick={changeToggle} /> </NavLink>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="/process/fill"> File a Process</a>
            <a className="dropdown-item" href="/process/view">View File Processes</a>
            <a className="dropdown-item" href="/process/pay">Payment</a>

          </div>
        </div>

        <div className='py-3 px-5 dropdown link-content'>
          <Link className='text-black-50 text-decoration-none' to='/Court' data-toggle="dropdown" >Court Processes<FaAngleDown /> </Link>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="/create/court">Create Court</a>
            <a className="dropdown-item" href="/courts">View Courts</a>
            <a className="dropdown-item" href="/lawfirms">Cost Process</a>
            <a className="dropdown-item" href="/assign/lawyer">Assign Lawyer</a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Navigation);