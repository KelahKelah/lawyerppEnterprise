import React, { useState, useEffect } from "react";
import axios from "axios";
import "./form.css";
import { withRouter } from "react-router-dom";
import Success from "../success/success";

const Form = (props) => {
  const [inputs, setInputs] = useState({});
  const [clientData, setClientData] = useState();
  const [lawyerData, setLawyerData] = useState();
  const [success, setSuccess] = useState(false);

  const clientUrl =
    "https://lawyerppenterprise.herokuapp.com/api/court/clients";
  const lawyerUrl =
    "https://lawyerppenterprise.herokuapp.com/api/court/lawyers";
  const createPostUrl =
    "https://lawyerppenterprise.herokuapp.com/api/court/create";

  const handleInputs = (e) => {
    console.log("target check", e.target.name)
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(inputs);
  };

  // Post request to create form
  const handleSubmits = (event) => {
    event.preventDefault();
    console.log('inputsssssssssss',inputs);

    axios
      .post(createPostUrl, inputs)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // Calling all clients endpiot

    axios
      .get(clientUrl)
      .then((res) => {
        if (res.status === 200) {
          console.log("client", res.data.data);

          setClientData(res.data.data);
          // setInputs({ ...inputs, client_id: res.data.data[0]._id });
        }
      })
      .catch((error) => {});
    axios
      .get(lawyerUrl)
      .then((res) => {
        if (res.status === 200) {
          console.log("lawyer", res.data.data);

          setLawyerData(res.data.data);
          // setInputs({ ...inputs, judge_id: res.data.data[0]._id });
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // Calling all lawyers endpoint
  }, []);

  // const getAllClientData = () => {
  //   if (clientData.allClientData.length > 0) {
  //     return clientData.allClientData.map((singleClientData, i) => {
  //       return (
  //         <option value={singleClientData._id}>
  //           {singleClientData.first_name + " " + singleClientData.last_name}
  //         </option>
  //       );
  //     });
  //   }
  // };

  // const getAllLawyerData = () => {
  //   if (lawyerData.allLawyerData.length > 0) {
  //     return lawyerData.allLawyerData.map((singleLawyerData, i) => {
  //       return (
  //         <option value={singleLawyerData._id}>
  //           {singleLawyerData.first_name + " " + singleLawyerData.last_name}
  //         </option>
  //       );
  //     });
  //   }
  // };

  return success ? (
    <Success
      type="createdCourt"
      message="You have sucessfully created a court"
      link="/courts"
      direction="courts"
    />
  ) : (
    <>
      <div className="form-container">
        <div className="form-content mt-0">
          <div className="iq-card-body px-3 py-2">
            <h2 className="d-flex justify-content-center border-bottom mb-5">
              Fill the form below to create a court
            </h2>
            <form onSubmit={handleSubmits}>
              <div className="form-group">
                <label htmlFor="exampleInputText1">Name of Court</label>
                <input
                  type="text"
                  className="form-control"
                  name="name_Of_court"
                  onChange={handleInputs}
                  placeholder="e.g. High Court of Lagos State, Court of Appeal, Supreme Court, etc"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail3">Judicial Division</label>
                <input
                  type="text"
                  className="form-control"
                  name="judicial_division"
                  onChange={handleInputs}
                  placeholder="(e.g. Lagos, Calabar, etc or N/A in the case of the Supreme Court"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputurl">Court designation</label>
                <input
                  type="text"
                  className="form-control"
                  name="court_designation"
                  onChange={handleInputs}
                  placeholder="e.g. Justice Kola’s Court, Court 1, etc"
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Judge</label>
                <select
                  className="form-control"
                  name="judge_id"
                  onChange={handleInputs}
                >
                  <option></option>
                  {lawyerData &&
                    lawyerData.map((lawyer, i) => (
                      <option value={lawyer._id} key={i}>
                        {lawyer.first_name + " " + lawyer.last_name}
                      </option>
                    ))}
                  {/* {getAllLawyerData()} */}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputNumber1">
                  Year of appointment to court
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="year_of_appointment_to_court"
                  onChange={handleInputs}
                  placeholder="E.g 2020"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword3">Judge role</label>
                <select
                  class="form-control"
                  name="judge_role"
                  onChange={handleInputs}
                >
                  <option></option>
                  <option>Chief Justice</option>
                  <option>President</option>
                  <option>Chief Judge</option>
                  <option>Grand Khadi</option>
                  <option>Presiding Justice</option>
                  <option>Presiding Judge</option>
                  <option>Justice</option>
                  <option>Judge</option>
                  <option>Khadi</option>
                  <option>Chief Magistrate</option>
                  <option>Magistrate</option>
                </select>
              </div>
              <div className="form-group">
                {/* <label htmlFor="exampleInputtime">
                   Judge administrative right
                 </label>
                 <input
                   type="text"
                   className="form-control"
                   name="judge_administrative_right"
                   onChange={handleInputs}
                 /> */}
                <label htmlFor="exampleInputdatetime">
                  Judge Assignment or Administrative Rights
                </label>
                <select
                  class="form-control"
                  name="judge_administrative_right"
                  onChange={handleInputs}
                >
                  <option></option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputdatetime">
                  Judge court designation
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="judge_court_designation"
                  onChange={handleInputs}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Court Staff</label>
                <select
                  className="form-control"
                  name="court_staff_id"
                  onChange={handleInputs}
                >
                  <option></option>
                  {clientData &&
                    clientData.length > 0 &&
                    clientData.map((client, i) => (
                      <option value={client._id} key={i}>
                        {client.first_name + " " + client.last_name}
                      </option>
                    ))}
                  {/* {getAllClientData()} */}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputdatetime">
                  Year of employement
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="year_of_employment"
                  onChange={handleInputs}
                  placeholder="E.g 2020"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputdatetime">Staff role</label>
                <select
                  class="form-control"
                  name="staff_role"
                  onChange={handleInputs}
                >
                  <option></option>
                  <option>Chief Registrar</option>
                  <option>Registrar</option>
                  <option>Clerk</option>
                  <option>Other Staff</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputdatetime">
                  Staff Assignment or Administrative Rights
                </label>
                <select
                  class="form-control"
                  name="staff_administrative_right"
                  onChange={handleInputs}
                >
                  <option></option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputdatetime">
                  Staff court designation
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="E.g. Court 1, Registry, N/A, etc."
                  name="staff_court_designation"
                  onChange={handleInputs}
                />
              </div>
              <div className="text-right">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(Form);
