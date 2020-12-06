import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/pageLoader/loader";
import { Link } from "react-router-dom";

const ViewFileProcesses = (props) => {
  const [allFileProcesses, setAllFileProcesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState("false");
  const viewFileProcessesUrl = "/fileprocess/filer_filed_process";
  const [assingedLawyers, setAssingedLawyers] = useState({});

  useEffect(() => {
    axios
      .get(viewFileProcessesUrl)
      .then((res) => {
        console.log(res.data.data);
        setIsLoading(false);
        setAllFileProcesses(res.data.data);
        setDisabled(false);
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 401") {
          props.setUnauthorized(true);
        }
      });
  }, []);
  const fetchAssignedLawyers = (processId) => {
    setDisabled("loading");
    axios
      .get(
        `https://lawyerppenterprise.herokuapp.com/api/fileprocess/assigned_lawyer?processId=${processId}`
      )
      .then((result) => {
        setDisabled("false");
        setAssingedLawyers(result.data.data);
      })
      .catch((error) => {
        if (error.message == "Request failed with status code 400") {
          setDisabled("true");
        }
      });
  };

  return isLoading ? (
    <Loader />
  ) : allFileProcesses.length == 0 ? (
    <h1 className="text-center">
      You have not filed a process yet, <br /> Click{" "}
      <Link to="/process/fill">here</Link> to file a process
    </h1>
  ) : (
    <div className="container mt-4">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Mode of commencement</th>
            <th scope="col">Amount (&#8358;)</th>
            <th scope="col">Lawyer</th>
            {/* <th scope="col"></th> */}
          </tr>
        </thead>
        <tbody>
          {allFileProcesses.length > 0 &&
            allFileProcesses.map((allFileProcesses, i) => {
              return (
                <tr
                // className="c-pointer allFileProcesses-tr"
                // data-target={`#moreInfo${i}`}
                // data-toggle="modal"
                >
                  <th scope="row">{i + 1}</th>

                  <td
                    className="c-pointer allFileProcesses-tr"
                    data-target={`#moreInfo${i}`}
                    data-toggle="modal"
                  >
                    {allFileProcesses.mode_of_commencement}
                  </td>

                  <td
                    className="c-pointer allFileProcesses-tr"
                    data-target={`#moreInfo${i}`}
                    data-toggle="modal"
                  >
                    {allFileProcesses.amount || " - "}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary text-white"
                      data-toggle="modal"
                      data-target="#assignedLawyer"
                      onClick={() => fetchAssignedLawyers(allFileProcesses._id)}
                    >
                      View assigned Lawyer
                    </button>
                  </td>
                  {/* <td>
                    <button
                      type="button"
                      className="btn btn-primary text-white"
                      onClick={() =>
                        props.history.push(
                          `/process/view/${allFileProcesses._id}`
                        )
                      }
                    >
                      View Single file process
                    </button>
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* Modal for assigned lawyer */}
      <section>
        <div
          className="modal fade"
          id="assignedLawyer"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="Assigned lawyer"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Lawyer Details
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
              {disabled === "true" ? (
                <div className="modal-body">
                  <p className="text-center">
                    This case hasn't been assigned a lawyer yet!!!
                  </p>
                </div>
              ) : disabled === "loading" ? (
                <div className="modal-body">
                  <p className="text-center">Wait a moment...</p>
                </div>
              ) : (
                <div className="modal-body">
                  <small>
                    <b>Lawyer Name: </b>
                    {Object.keys(assingedLawyers).length > 0 &&
                      assingedLawyers.assignedJudgeId.first_name +
                        " " +
                        assingedLawyers.assignedJudgeId.last_name}
                  </small>
                  <br />
                  <small>
                    <b>Email address: </b>
                    {Object.keys(assingedLawyers).length > 0 &&
                      assingedLawyers.assignedJudgeId.email_address}
                  </small>
                  <br />
                  <small>
                    <b>Phone number: </b>
                    {Object.keys(assingedLawyers).length > 0 &&
                      assingedLawyers.assignedJudgeId.phone_number}
                  </small>
                  <br />
                  <small>
                    <b>Enrollment number: </b>
                    {Object.keys(assingedLawyers).length > 0 &&
                      assingedLawyers.assignedJudgeId.enrollment_number}
                  </small>
                  <br />
                  <small>
                    <b>Name of Court: </b>
                    {Object.keys(assingedLawyers).length > 0 &&
                      assingedLawyers.courtId.name_Of_court}
                  </small>
                  <br />
                  <small>
                    <b>Judicial Division: </b>
                    {Object.keys(assingedLawyers).length > 0 &&
                      assingedLawyers.courtId.judicial_division}
                  </small>
                  <br />
                  <small>
                    <b>Court Designation: </b>
                    {Object.keys(assingedLawyers).length > 0 &&
                      assingedLawyers.courtId.courts_designations[0]
                        .court_designation}
                  </small>
                  <br />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal for filed process */}
      <section>
        {allFileProcesses.length > 0 &&
          allFileProcesses.map((caseDetail, i) => {
            return (
              <div
                className="modal fade"
                tabIndex="-1"
                role="dialog"
                id={`moreInfo${i}`}
              >
                <div
                  className="modal-dialog modal-dialog-centered modal-xl"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header border-0">
                      <h5 className="modal-title ">Case Details</h5>
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
                      <h6 className="mt-3">
                        <b>Mode of Commencement: </b>
                        {caseDetail.mode_of_commencement}
                      </h6>
                      <h6 className="mt-3">
                        {caseDetail.amount ? (
                          <div>
                            <b>Amount: </b>
                            &#8358;
                            {caseDetail.amount}
                          </div>
                        ) : (
                          <div>
                            <b>Amount: </b>
                            This case hasn't been costed yet
                          </div>
                        )}
                      </h6>
                      <div className="row mx-0">
                        <div className="col-12 border-left">
                          <div className="staff_list row">
                            <div className="col-4 border-left">
                              <b className="border-bottom border-dark">
                                Client Details
                              </b>
                              <br />
                              <small>
                                <b>Client name: </b>
                                {`${
                                  caseDetail.client_details.filer_name &&
                                  caseDetail.client_details.filer_name
                                    .first_name
                                } ${
                                  caseDetail.client_details.filer_name &&
                                  caseDetail.client_details.filer_name.last_name
                                }`}
                              </small>
                              <br />
                              <small>
                                <b>Email address: </b>
                                {(caseDetail.client_details.filer_name &&
                                  caseDetail.client_details.filer_name
                                    .email_address) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Phone Number: </b>
                                {(caseDetail.client_details.filer_name &&
                                  caseDetail.client_details.filer_name
                                    .phone_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Whatsapp number: </b>
                                {(caseDetail.client_details.filer_name &&
                                  caseDetail.client_details.filer_name
                                    .phone_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>User Type: </b>
                                {(caseDetail.client_details.filer_name &&
                                  caseDetail.client_details.filer_name
                                    .user_type) ||
                                  "N/A"}
                              </small>
                              <br />
                              <br />
                              <b className="border-bottom border-dark">
                                Co-counsel
                              </b>
                              <br />
                              <small>
                                <b>Client name: </b>
                                {(caseDetail.cocounsil[0].cocounsil_id &&
                                  caseDetail.cocounsil[0].cocounsil_id.name) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Email address: </b>
                                {(caseDetail.cocounsil[0].cocounsil_id &&
                                  caseDetail.cocounsil[0].cocounsil_id
                                    .email_address) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Phone Number: </b>
                                {(caseDetail.cocounsil[0].cocounsil_id &&
                                  caseDetail.cocounsil[0].cocounsil_id
                                    .phone_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>WhatsApp number: </b>
                                {(caseDetail.cocounsil[0].cocounsil_id &&
                                  caseDetail.cocounsil[0].cocounsil_id
                                    .whatsapp_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Facebook ID: </b>
                                {(caseDetail.cocounsil[0].cocounsil_id &&
                                  caseDetail.cocounsil[0].cocounsil_id
                                    .facebook_id) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Office Address: </b>
                                {(caseDetail.cocounsil[0].cocounsil_id &&
                                  caseDetail.cocounsil[0].cocounsil_id
                                    .office_address) ||
                                  "N/A"}
                              </small>
                              <br />
                              <br />
                              <b className="border-bottom border-dark">
                                Court Details
                              </b>
                              <br />
                              <small>
                                <b>Court Designation: </b>
                                {(caseDetail.courtId &&
                                  caseDetail.courtId.courts_designations[0]
                                    .court_designation) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Judicial Division: </b>
                                {(caseDetail.courtId &&
                                  caseDetail.courtId.judicial_division) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Judge court designation: </b>
                                {(caseDetail.courtId &&
                                  caseDetail.courtId.judges[0]
                                    .judge_court_designation) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Judge role: </b>
                                {(caseDetail.courtId &&
                                  caseDetail.courtId.judges[0].judge_role) ||
                                  "N/A"}
                              </small>
                              <br />
                              <br />
                            </div>
                            <div className="col-4 border-left">
                              <b className="border-bottom border-dark">
                                Law Firm Details
                              </b>
                              <br />
                              <small>
                                <b>N/A</b>
                              </small>
                              <br />
                              <br />
                              <b className="border-bottom border-dark">
                                Lawyerpp Co-counsel
                              </b>
                              <br />
                              <small>
                                <b>Name: </b>
                                {(caseDetail.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  caseDetail.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.first_name +
                                    " " +
                                    caseDetail.lawyerpp_cocounsil[0]
                                      .lawyerpp_cocounsil_id.last_name) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Email address: </b>
                                {(caseDetail.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  caseDetail.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.email_address) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Phone Number: </b>
                                {(caseDetail.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  caseDetail.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.phone_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>WhatsApp number: </b>
                                {(caseDetail.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  caseDetail.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.phone_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Enrolment Number: </b>
                                {(caseDetail.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  caseDetail.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.enrollment_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Facebook ID: </b>
                                {(caseDetail.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  caseDetail.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.facebook_id) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Office Address: </b>
                                {(caseDetail.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  caseDetail.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.office_address) ||
                                  "N/A"}
                              </small>
                              <br />
                              <br />
                              <b className="border-bottom border-dark">
                                Lawyerpp Opposing party
                              </b>
                              <br />
                              {caseDetail.lawyerpp_opposing_party[0]
                                .lawyerpp_opposing_party_Id == null ? (
                                <small>
                                  <b>N/A</b>
                                </small>
                              ) : (
                                <div>
                                  <small>
                                    <b>Name: </b>
                                    {(caseDetail.lawyerpp_opposing_party &&
                                      caseDetail.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id &&
                                      caseDetail.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id.first_name +
                                        " " +
                                        caseDetail.lawyerpp_opposing_party[0]
                                          .lawyerpp_opposing_party_Id
                                          .last_name) ||
                                      "N/A"}
                                  </small>
                                  <br />
                                  <small>
                                    <b>Email address: </b>
                                    {(caseDetail.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      caseDetail.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id
                                        .email_address) ||
                                      "N/A"}
                                  </small>
                                  <br />
                                  <small>
                                    <b>Phone Number: </b>
                                    {(caseDetail.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      caseDetail.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id
                                        .phone_number) ||
                                      "N/A"}
                                  </small>
                                  <br />
                                  <small>
                                    <b>Facebook ID: </b>
                                    {(caseDetail.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      caseDetail.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id
                                        .phone_number) ||
                                      "N/A"}
                                  </small>
                                  <br />
                                  <small>
                                    <b>WhatsApp number: </b>
                                    {(caseDetail.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      caseDetail.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id
                                        .whatsapp_number) ||
                                      "N/A"}
                                  </small>
                                  <br />
                                  <small>
                                    <b>Office Address: </b>
                                    {(caseDetail.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      caseDetail.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id
                                        .office_address) ||
                                      "N/A"}
                                  </small>
                                  <br />
                                  <br />
                                </div>
                              )}
                            </div>
                            <div className="col-4 border-left">
                              <b className="border-bottom border-dark">
                                Opposing Lawyer
                              </b>
                              <br />
                              <small>
                                <b>Name: </b>
                                {(caseDetail.opposing_lawyers[0]
                                  .opposing_lawyer_id &&
                                  caseDetail.opposing_lawyers[0]
                                    .opposing_lawyer_id.first_name +
                                    " " +
                                    caseDetail.opposing_lawyers[0]
                                      .opposing_lawyer_id.last_name) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Email address: </b>
                                {(caseDetail.opposing_lawyers[0]
                                  .opposing_lawyer_id &&
                                  caseDetail.opposing_lawyers[0]
                                    .opposing_lawyer_id.email_address) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Phone Number: </b>
                                {(caseDetail.opposing_lawyers[0]
                                  .opposing_lawyer_id &&
                                  caseDetail.opposing_lawyers[0]
                                    .opposing_lawyer_id.phone_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Enrolment Number: </b>
                                {(caseDetail.opposing_lawyers[0]
                                  .opposing_lawyer_id &&
                                  caseDetail.opposing_lawyers[0]
                                    .opposing_lawyer_id.enrollment_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <br />
                              <b className="border-bottom border-dark">
                                Opposing Party
                              </b>
                              <br />
                              <small>
                                <b>Name: </b>
                                {(caseDetail.opposing_party[0]
                                  .opposing_party_Id &&
                                  caseDetail.opposing_party[0].opposing_party_Id
                                    .opposing_name) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Email address: </b>
                                {(caseDetail.opposing_party[0]
                                  .opposing_party_Id &&
                                  caseDetail.opposing_party[0].opposing_party_Id
                                    .email_address) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Phone Number: </b>
                                {(caseDetail.opposing_party[0]
                                  .opposing_party_Id &&
                                  caseDetail.opposing_party[0].opposing_party_Id
                                    .opposing_phone_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>WhatsApp Number: </b>
                                {(caseDetail.opposing_party[0]
                                  .opposing_party_Id &&
                                  caseDetail.opposing_party[0].opposing_party_Id
                                    .opposing_whatsapp_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Facebook ID: </b>
                                {(caseDetail.opposing_party[0]
                                  .opposing_party_Id &&
                                  caseDetail.opposing_party[0].opposing_party_Id
                                    .opposing_facebook_id) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Office Address: </b>
                                {(caseDetail.opposing_party[0]
                                  .opposing_party_Id &&
                                  caseDetail.opposing_party[0].opposing_party_Id
                                    .opposing_office_address) ||
                                  "N/A"}
                              </small>
                              <br />
                              <br />
                              <b>Process Document: </b>
                              {caseDetail.processImageUrl !== "" ? (
                                <a
                                  className="btn btn-primary btn-sm text-white"
                                  href={`${caseDetail.processImageUrl}`}
                                  target="_blank"
                                >
                                  View document
                                </a>
                              ) : (
                                "no file"
                              )}
                            </div>
                          </div>
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
export default ViewFileProcesses;
