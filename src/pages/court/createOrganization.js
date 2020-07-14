import React, { useState } from "react";
import axios from "axios";
import Success from "../../components/success/success";

const CreateOrganization = () => {
  const [data, setData] = useState({});
  const [success, setSuccess] = useState(false);


  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data sent",data);
    axios
      .post("https://lawyerppenterprise.herokuapp.com/api/corporg/create", data)
      .then((result) => {
        console.log(result);
        setSuccess(true);
      })
      .catch((error) => {});
  };

  return success ? (
    <Success
      type="createdOrg"
      message="You have successfully created this organization"
      link="/view/organization"
      direction="created organizations"
    />
  ) : (
    <div className="d-flex justify-content-center">
      <div className="col-6 card mt-6 p-5">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-3 text-center">Create an Organization</h2>
          <div className="row">
            <div className="form-group col-6">
              <label for="exampleFormControlSelect1">
                Type of Organisation
              </label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                name="Type_of_Organisation"
                onChange={handleChange}
                required
              >
                <option></option>
                <option>Corporate Organisation</option>
                <option>Government MDA</option>
              </select>
            </div>
            <div className="form-group col-6">
              <label for="exampleFormControlSelect1">
                Type of Government MDA
              </label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                name="Type_of_Government_MDA"
                onChange={handleChange}
                required
              >
                <option></option>
                <option>Ministry of Justice</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-6">
              <label for="exampleInputEmail1">Name of Organization</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter name of organization"
                name="Name_of_organisation"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-6">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="Email_address"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-6">
              <label for="exampleInputEmail1">Website</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Website"
                name="Website"
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-6">
              <label for="exampleInputEmail1">Contact Number</label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Organization number"
                name="Contact_number"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Contact Address</label>
            <textarea
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Contact Address"
              name="Contact_address"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrganization;
