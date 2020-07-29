import React, { useEffect, useState } from "react";
import axios from "axios";
import "./court.css";
import Loader from "../../components/pageLoader/loader";
import Success from "../../components/success/success";

const ViewCourt = (props) => {
  const courtUrl = "https://lawyerppenterprise.herokuapp.com/api/court/courts";
  const [courts, setCourts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputs, setInputs] = useState({});
  const [courtId, setCourtId] = useState("");

  const [clientData, setClientData] = useState();
  const [lawyerData, setLawyerData] = useState();
  const [success, setSucess] = useState(false);

  const clientUrl =
    "https://lawyerppenterprise.herokuapp.com/api/court/clients";
  const lawyerUrl =
    "https://lawyerppenterprise.herokuapp.com/api/court/lawyers";
  const createPostUrl =
    "https://lawyerppenterprise.herokuapp.com/api/court/create";

  const postLawyerUrl = `https://lawyerppenterprise.herokuapp.com/api/court/add_lawyer?courtId=${courtId}`;

  const handleInputs = (e) => {
    console.log("target check", e.target.name);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(inputs);
  };

  // Post request to create form
  const handleSubmitLawyer = (event) => {
    event.preventDefault();
    console.log(inputs);
    axios
      .post(postLawyerUrl, inputs)
      .then((res) => {
        // if(res.suce)
        setSucess(true)
        console.log('response to post lawyerData', res);
      
      }
      )
      .catch((err) => {
        if (err.message === "Request failed with status code 401") {
          props.setUnauthorized(true);
        }
      });
  };
  useEffect(() => {
    axios
      .get(clientUrl)
      .then((res) => {
        if (res.status === 200) {
          console.log("client", res.data.data);

          setClientData(res.data.data);
          // setInputs({ ...inputs, client_id: res.data.data[0]._id });
        }
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 401") {
          props.setUnauthorized(true);
        }
      });
    axios
      .get(lawyerUrl)
      .then((res) => {
        if (res.status === 200) {
          setLawyerData(res.data.data);
        }
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 401") {
          props.setUnauthorized(true);
        }
        console.error(error);
      });
    axios
      .get(courtUrl)
      .then((result) => {
        setIsLoading(false);
        if (result.status === 200) {
          setCourts(result.data.data);
          console.log("courts", result.data.data);
        }
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 401") {
          props.setUnauthorized(true);
        }
      });
  }, []);

  return success ? (
    <Success
      type="addedLawyer"
      message="You have successfully added a lawyer"
    />
  ) : isLoading ? (
    <Loader />
  ) : (
    <div className="container mt-4">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Judicial Division</th>
            <th scope="col">Judge Role</th>
            <th></th>
            <th></th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {courts.length > 0 &&
            courts.map((court, i) => {
              return (
                <tr
                className="c-pointer court-tr"
                       
                // data-target={`#moreInfo${i}`}
                // data-toggle="modal"
                >
                  <th scope="row">{i + 1}</th>
                  <td>{court.name_Of_court}</td>
                  <td>{court.judicial_division}</td>
                  <td>{court.judges[0].judge_role}</td>
                  <td>
                    <button  className="btn btn-primary text-white c-pointer" data-target={`#moreInfo${i}`} data-toggle="modal" target="_blank">View Court</button>
                  </td>
                  <td>
                    <button  className="btn btn-primary text-white c-pointer" type="button" data-toggle="modal" data-target="#lawyer" href="" onClick={()=>{setCourtId(court._id)}} target="_blank">Add Lawyer to court</button>
                  </td>
                  {/* <td>
                    <button className="btn btn-primary text-white c-pointer" type="button" data-toggle="modal" data-target="#client"href="" target="_blank">Add Client</button>
                  </td>      */}
           <section>
        {courts.length > 0 &&
          courts.map((court, i) => {
            return (
              <div
                className="modal fade"
                tabIndex="-1"
                role="dialog"
                id={`moreInfo${i}`}
              >
                <div
                  className="modal-dialog modal-dialog-centered modal-lg"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header border-0">
                      <h5 className="modal-title ">{court.name_Of_court}</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="row mx-0">
                        <div className="col-6 border-left">
                          <p>
                            <b>Court's designation: </b>
                            {court.courts_designations[0].court_designation}
                          </p>
                          {/* <p><b>Staff role: </b>{court.court_staff[0].staff_role}</p>
                                                <p><b>Staff's administrative right: </b>{court.court_staff[0].staff_administrative_right}</p>
                                                <p><b>Judge role: </b>{court.judges[0].judge_role}</p>
                                                <p><b>Year of appointment: </b>{new Date(court.judges[0].year_of_appointment_to_court).getFullYear()}</p> */}

                                      <h3 className="mt-3">Court Staffs</h3>
                                      <ul>
                                        {court.court_staff.map((staff, i) => {
                                          return (
                                            <li className="staff_list">
                                              <small>
                                                <b>Name: </b>
                                                {`${
                                                  staff.court_staff_id
                                                    ? staff.court_staff_id
                                                        .first_name
                                                    : ""
                                                } ${
                                                  staff.court_staff_id
                                                    ? staff.court_staff_id
                                                        .last_name
                                                    : "-"
                                                }`}
                                              </small>
                                              <br />
                                              <small>
                                                <b>email: </b>
                                                {staff.court_staff_id
                                                  ? staff.court_staff_id
                                                      .email_address
                                                  : "-"}
                                              </small>
                                              <br />
                                              <small>
                                                <b>phone number: </b>
                                                {staff.court_staff_id
                                                  ? staff.court_staff_id
                                                      .phone_number
                                                  : "-"}
                                              </small>
                                              <br />
                                              <small>
                                                <b>year of employment: </b>
                                                {staff.year_of_employment}
                                              </small>
                                              <br />
                                              <small>
                                                <b>staff role: </b>
                                                {staff.staff_role}
                                              </small>
                                              <br />
                                              <small>
                                                <b>staff court designation: </b>
                                                {staff.staff_court_designation}
                                              </small>
                                              <br />
                                              <small>
                                                <b>
                                                  staff administrative right:{" "}
                                                </b>
                                                {
                                                  staff.staff_administrative_right
                                                }
                                              </small>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                    <div className="col-6 border-left">
                                      {/* <p><b>Staff's designation: </b>{court.court_staff[0].staff_court_designation}</p>
                                                <p><b>Year of employment: </b>{court.court_staff[0].year_of_employment}</p>
                                                <p><b>Judge's administrative right: </b>{court.judges[0].judge_administrative_right}</p>
                                                <p><b>Judge court designation: </b>{court.judges[0].judge_court_designation}</p> */}
                                      <p>
                                        <b>Judicial division: </b>
                                        {court.judicial_division}
                                      </p>

                                      <h3 className="mt-3">Court Judges</h3>
                                      <ul>
                                        {court.judges.map((judge, i) => {
                                          return (
                                            <li className="staff_list">
                                              <small>
                                                <b>Name: </b>
                                                {`${judge.judge_id.first_name} ${court.judges[0].judge_id.last_name}`}
                                              </small>
                                              <br />
                                              <small>
                                                <b>email: </b>
                                                {judge.judge_id.email_address}
                                              </small>
                                              <br />
                                              <small>
                                                <b>phone number: </b>
                                                {judge.judge_id.phone_number}
                                              </small>
                                              <br />
                                              <small>
                                                <b>year of appointment: </b>
                                                {new Date(
                                                  judge.year_of_appointment_to_court
                                                ).getFullYear()}
                                              </small>
                                              <br />
                                              <small>
                                                <b>judge role: </b>
                                                {judge.judge_role}
                                              </small>
                                              <br />
                                              <small>
                                                <b>judge court designation: </b>
                                                {judge.judge_court_designation}
                                              </small>
                                              <br />
                                              <small>
                                                <b>
                                                  judge administrative right:{" "}
                                                </b>
                                                {
                                                  judge.judge_administrative_right
                                                }
                                              </small>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </section>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/*Begining of map for Add lawyer form */}
      <section>
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="lawyer"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Lawyer
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmitLawyer}>
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
                        ))}{" "}
                      */
                      {/* {getAllLawyerData()}        */}
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
                      className="form-control"
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
                      className="form-control"
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

                  <div className="text-right">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End of map for add lawyer form */}

      {/*Begining of map for Add client form */}
      <section>
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="client"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Client
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="">Client</label>
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
                    Judge court designation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="judge_court_designation"
                    onChange={handleInputs}
                  />
                </div>

                <div className="text-right">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End of map for add client form */}

      <section>
        {courts.length > 0 &&
          courts.map((court, i) => {
            return (
              <div
                className="modal fade"
                tabIndex="-1"
                role="dialog"
                id={`moreInfo${i}`}
              >
                <div
                  className="modal-dialog modal-dialog-centered modal-lg"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header border-0">
                      <h5 className="modal-title ">{court.name_Of_court}</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="row mx-0">
                        <div className="col-6 border-left">
                          <p>
                            <b>Court's designation: </b>
                            {court.courts_designations[0].court_designation}
                          </p>
                          {/* <p><b>Staff role: </b>{court.court_staff[0].staff_role}</p>
                                                <p><b>Staff's administrative right: </b>{court.court_staff[0].staff_administrative_right}</p>
                                                <p><b>Judge role: </b>{court.judges[0].judge_role}</p>
                                                <p><b>Year of appointment: </b>{new Date(court.judges[0].year_of_appointment_to_court).getFullYear()}</p> */}

                          <h3 className="mt-3">Court Staffs</h3>
                          <ul>
                            {court.court_staff.map((staff, i) => {
                              return (
                                <li className="staff_list">
                                  <small>
                                    <b>Name: </b>
                                    {`${
                                      staff.court_staff_id
                                        ? staff.court_staff_id.first_name
                                        : ""
                                    } ${
                                      staff.court_staff_id
                                        ? staff.court_staff_id.last_name
                                        : "-"
                                    }`}
                                  </small>
                                  <br />
                                  <small>
                                    <b>email: </b>
                                    {staff.court_staff_id
                                      ? staff.court_staff_id.email_address
                                      : "-"}
                                  </small>
                                  <br />
                                  <small>
                                    <b>phone number: </b>
                                    {staff.court_staff_id
                                      ? staff.court_staff_id.phone_number
                                      : "-"}
                                  </small>
                                  <br />
                                  <small>
                                    <b>year of employment: </b>
                                    {staff.year_of_employment}
                                  </small>
                                  <br />
                                  <small>
                                    <b>staff role: </b>
                                    {staff.staff_role}
                                  </small>
                                  <br />
                                  <small>
                                    <b>staff court designation: </b>
                                    {staff.staff_court_designation}
                                  </small>
                                  <br />
                                  <small>
                                    <b>staff administrative right: </b>
                                    {staff.staff_administrative_right}
                                  </small>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="col-6 border-left">
                          {/* <p><b>Staff's designation: </b>{court.court_staff[0].staff_court_designation}</p>
                                                <p><b>Year of employment: </b>{court.court_staff[0].year_of_employment}</p>
                                                <p><b>Judge's administrative right: </b>{court.judges[0].judge_administrative_right}</p>
                                                <p><b>Judge court designation: </b>{court.judges[0].judge_court_designation}</p> */}
                          <p>
                            <b>Judicial division: </b>
                            {court.judicial_division}
                          </p>

                          <h3 className="mt-3">Court Judges</h3>
                          <ul>
                            {court.judges.map((judge, i) => {
                              return (
                                <li className="staff_list">
                                  <small>
                                    <b>Name: </b>
                                    {`${judge.judge_id.first_name} ${court.judges[0].judge_id.last_name}`}
                                  </small>
                                  <br />
                                  <small>
                                    <b>email: </b>
                                    {judge.judge_id.email_address}
                                  </small>
                                  <br />
                                  <small>
                                    <b>phone number: </b>
                                    {judge.judge_id.phone_number}
                                  </small>
                                  <br />
                                  <small>
                                    <b>year of appointment: </b>
                                    {new Date(
                                      judge.year_of_appointment_to_court
                                    ).getFullYear()}
                                  </small>
                                  <br />
                                  <small>
                                    <b>judge role: </b>
                                    {judge.judge_role}
                                  </small>
                                  <br />
                                  <small>
                                    <b>judge court designation: </b>
                                    {judge.judge_court_designation}
                                  </small>
                                  <br />
                                  <small>
                                    <b>judge administrative right: </b>
                                    {judge.judge_administrative_right}
                                  </small>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
};

export default ViewCourt;
