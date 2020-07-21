import React, { useEffect, useState } from "react";
import axios from "axios";
import "./court.css";
import Error from "../../components/error/error";
import Loader from "../../components/pageLoader/loader";
import Success from "../../components/success/success";

const LawyerCases = (props) => {
  const lawfirms = `/fileprocess/All_court_filed_process?courtId=${props.match.params.id}`;
  const [cases, setCases] = useState([]);
  const [postData, setPostData] = useState({
    courtId: "",
    processFee: "",
  });
  const [processId, setprocessId] = useState();
  const [error, seterror] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const postUrl = `/fileprocess/cost_filed_process?processId=${processId}`;

  useEffect(() => {
    axios
      .get(lawfirms)
      .then((result) => {
        setIsLoading(false);
        if (result.status === 200) {
          setCases(result.data.data);
          console.log("cases", result.data.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Request failed with status code 404") {
          seterror("404");
        }
      });
  }, []);

  const setData = (singleCase) => {
    setprocessId(singleCase._id);
    setPostData({ courtId: singleCase.courtId._id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(postData);
    axios
      .post(postUrl, postData)
      .then((result) => {
        let $ = window.$;
        $(".modal-backdrop").remove();
        setSuccess(true);
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Request failed with status code 401") {
          seterror("401");
        }
        if (error.message === "Sorry you cannot view this ") {
          seterror("404");
        }
      });
  };

  return success ? (
    <Success
      type="costed"
      message="You have successfully costed this process"
      link="/lawfirms"
      direction="other processes"
    />
  ) : error == "404" ? (
    <Error
      message="404"
      advice="You are not designated to this court"
      link="/lawfirms"
    />
  ) : error == "401" ? (
    <Error
      message="401"
      advice="You are not approved to perform this action"
      link="/lawfirms"
    />
  ) : isLoading ? (
    <Loader />
  ) : (
    <div className="container mt-4">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Client name</th>
            <th scope="col">Mode of Commencement</th>
            <th scope="col">Opposing Party</th>
            <th scope="col">Opposing Lawyer</th>
            <th scope="col">Process Document</th>
          </tr>
        </thead>
        <tbody>
          {cases.length > 0 &&
            cases.map((singleCase, i) => {
              return (
                <tr
                  className="c-pointer court-tr"
                  data-target={`#moreInfo${i}`}
                  data-toggle="modal"
                  onClick={() => setData(singleCase)}
                >
                  <th scope="row">{i + 1}</th>
                  <td>
                    {singleCase.client_details.filer_name &&
                      singleCase.client_details.filer_name.first_name +
                        " " +
                        singleCase.client_details.filer_name &&
                      singleCase.client_details.filer_name.last_name}
                  </td>
                  <td>{singleCase.mode_of_commencement}</td>
                  <td>
                    {singleCase.opposing_party[0].opposing_party_Id &&
                      singleCase.opposing_party[0].opposing_party_Id
                        .opposing_name}
                  </td>
                  <td>
                    {singleCase.opposing_lawyers[0].opposing_lawyer_id &&
                      singleCase.opposing_lawyers[0].opposing_lawyer_id
                        .first_name +
                        " " +
                        singleCase.opposing_lawyers[0].opposing_lawyer_id
                          .last_name}
                  </td>
                  <td>
                    {singleCase.processImageUrl !== "" ? (
                      <a
                        className="btn btn-primary btn-block text-white"
                        href={`${singleCase.processImageUrl}`}
                        target="_blank"
                      >
                        View document
                      </a>
                    ) : (
                      "no file"
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <section>
        {cases.length > 0 &&
          cases.map((caseDetail, i) => {
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
                      <h5 className="mb-4">
                        <b>Mode of Commencement: </b>
                        {caseDetail.mode_of_commencement}
                      </h5>
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
                                {caseDetail.client_details.filer_name &&
                                  caseDetail.client_details.filer_name
                                    .email_address}
                              </small>
                              <br />
                              <small>
                                <b>Phone number: </b>
                                {caseDetail.client_details.filer_name &&
                                  caseDetail.client_details.filer_name
                                    .phone_number}
                              </small>
                              <br />
                              <small>
                                <b>Whatsapp number: </b>
                                {caseDetail.client_details.filer_name &&
                                  caseDetail.client_details.filer_name
                                    .phone_number}
                              </small>
                              <br />
                              <small>
                                <b>User Type: </b>
                                {caseDetail.client_details.filer_name &&
                                  caseDetail.client_details.filer_name
                                    .user_type}
                              </small>
                              <br />
                              <br />
                              <b className="border-bottom border-dark">
                                Co-counsil
                              </b>
                              <br />
                              <small>
                                <b>Client name: </b>
                                {caseDetail.cocounsil[0].cocounsil_id &&
                                  caseDetail.cocounsil[0].cocounsil_id.name}
                              </small>
                              <br />
                              <small>
                                <b>Email address: </b>
                                {caseDetail.cocounsil[0].cocounsil_id &&
                                  caseDetail.cocounsil[0].cocounsil_id
                                    .email_address}
                              </small>
                              <br />
                              <small>
                                <b>Phone number: </b>
                                {caseDetail.cocounsil[0].cocounsil_id &&
                                  caseDetail.cocounsil[0].cocounsil_id
                                    .phone_number}
                              </small>
                              <br />
                              <small>
                                <b>WhatsApp number: </b>
                                {caseDetail.cocounsil[0].cocounsil_id &&
                                  caseDetail.cocounsil[0].cocounsil_id
                                    .whatsapp_number}
                              </small>
                              <br />
                              <small>
                                <b>Facebook ID: </b>
                                {caseDetail.cocounsil[0].cocounsil_id &&
                                  caseDetail.cocounsil[0].cocounsil_id
                                    .facebook_id}
                              </small>
                              <br />
                              <small>
                                <b>Office Address: </b>
                                {caseDetail.cocounsil[0].cocounsil_id &&
                                  caseDetail.cocounsil[0].cocounsil_id
                                    .office_address}
                              </small>
                              <br />
                              <br />
                              <b className="border-bottom border-dark">
                                Court Details
                              </b>
                              <br />
                              <small>
                                <b>Court Designation: </b>
                                {caseDetail.courtId.courts_designations[0] &&
                                  caseDetail.courtId.courts_designations[0]
                                    .court_designation}
                              </small>
                              <br />
                              <small>
                                <b>Judicial Division: </b>
                                {caseDetail.courtId.judicial_division}
                              </small>
                              <br />
                              <small>
                                <b>Judge court designation: </b>
                                {caseDetail.courtId.judges[0] &&
                                  caseDetail.courtId.judges[0]
                                    .judge_court_designation}
                              </small>
                              <br />
                              <small>
                                <b>Judge role: </b>
                                {caseDetail.courtId.judges[0] &&
                                  caseDetail.courtId.judges[0].judge_role}
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
                                Lawyerpp Co-counsil
                              </b>
                              <br />
                              <small>
                                <b>Name: </b>
                                {caseDetail.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  caseDetail.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.first_name +
                                    " " +
                                    caseDetail.lawyerpp_cocounsil[0]
                                      .lawyerpp_cocounsil_id.last_name}
                              </small>
                              <br />
                              <small>
                                <b>Email address: </b>
                                {caseDetail.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  caseDetail.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.email_address}
                              </small>
                              <br />
                              <small>
                                <b>Phone number: </b>
                                {caseDetail.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  caseDetail.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.phone_number}
                              </small>
                              <br />
                              <small>
                                <b>Whatsapp number: </b>
                                {caseDetail.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  caseDetail.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.phone_number}
                              </small>
                              <br />
                              <small>
                                <b>Enrollment number: </b>
                                {caseDetail.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  caseDetail.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.enrollment_number}
                              </small>
                              <br />
                              <br />
                              <b className="border-bottom border-dark">
                                Lawyerpp Opposing party
                              </b>
                              <br />
                              {caseDetail.lawyerpp_opposing_party[0]
                                .opposing_lawyer_id == null ? (
                                <small>
                                  <b>N/A</b>
                                </small>
                              ) : (
                                <div>
                                  <small>
                                    <b>Name: </b>
                                    {caseDetail.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      caseDetail.lawyerpp_opposing_party[0]
                                        .lawyerpp_cocounsil_id.first_name +
                                        " " +
                                        caseDetail.lawyerpp_opposing_party[0]
                                          .lawyerpp_opposing_party_Id.last_name}
                                  </small>
                                  <br />
                                  <small>
                                    <b>Email address: </b>
                                    {caseDetail.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      caseDetail.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id
                                        .email_address}
                                  </small>
                                  <br />
                                  <small>
                                    <b>Phone number: </b>
                                    {caseDetail.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      caseDetail.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id
                                        .phone_number}
                                  </small>
                                  <br />
                                  <small>
                                    <b>Facebook ID: </b>
                                    {caseDetail.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      caseDetail.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id
                                        .phone_number}
                                  </small>
                                  <br />
                                  <small>
                                    <b>WhatsApp number: </b>
                                    {caseDetail.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      caseDetail.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id
                                        .whatsapp_number}
                                  </small>
                                  <br />
                                  <small>
                                    <b>Office Address: </b>
                                    {caseDetail.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      caseDetail.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id
                                        .office_address}
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
                                {caseDetail.opposing_lawyers[0]
                                  .opposing_lawyer_id &&
                                  caseDetail.opposing_lawyers[0]
                                    .opposing_lawyer_id.first_name +
                                    " " +
                                    caseDetail.opposing_lawyers[0]
                                      .opposing_lawyer_id.last_name}
                              </small>
                              <br />
                              <small>
                                <b>Email address: </b>
                                {caseDetail.opposing_lawyers[0]
                                  .opposing_lawyer_id &&
                                  caseDetail.opposing_lawyers[0]
                                    .opposing_lawyer_id.email_address}
                              </small>
                              <br />
                              <small>
                                <b>Phone number: </b>
                                {caseDetail.opposing_lawyers[0]
                                  .opposing_lawyer_id &&
                                  caseDetail.opposing_lawyers[0]
                                    .opposing_lawyer_id.phone_number}
                              </small>
                              <br />
                              <small>
                                <b>Enrolment number: </b>
                                {caseDetail.opposing_lawyers[0]
                                  .opposing_lawyer_id &&
                                  caseDetail.opposing_lawyers[0]
                                    .opposing_lawyer_id.enrollment_number}
                              </small>
                              <br />
                              <br />
                              <b className="border-bottom border-dark">
                                Opposing Party
                              </b>
                              <br />
                              <small>
                                <b>Name: </b>
                                {caseDetail.opposing_party[0]
                                  .opposing_party_Id &&
                                  caseDetail.opposing_party[0].opposing_party_Id
                                    .opposing_name}
                              </small>
                              <br />
                              <small>
                                <b>Email address: </b>
                                {caseDetail.opposing_party[0]
                                  .opposing_party_Id &&
                                  caseDetail.opposing_party[0].opposing_party_Id
                                    .email_address}
                              </small>
                              <br />
                              <small>
                                <b>Phone number: </b>
                                {caseDetail.opposing_party[0]
                                  .opposing_party_Id &&
                                  caseDetail.opposing_party[0].opposing_party_Id
                                    .opposing_phone_number}
                              </small>
                              <br />
                              <small>
                                <b>WhatsApp number: </b>
                                {caseDetail.opposing_party[0]
                                  .opposing_party_Id &&
                                  caseDetail.opposing_party[0].opposing_party_Id
                                    .opposing_whatsapp_number}
                              </small>
                              <br />
                              <small>
                                <b>Facebook ID: </b>
                                {caseDetail.opposing_party[0]
                                  .opposing_party_Id &&
                                  caseDetail.opposing_party[0].opposing_party_Id
                                    .opposing_facebook_id}
                              </small>
                              <br />
                              <small>
                                <b>Office Address: </b>
                                {caseDetail.opposing_party[0]
                                  .opposing_party_Id &&
                                  caseDetail.opposing_party[0].opposing_party_Id
                                    .opposing_office_address}
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
                      <form
                        className="form-inline d-flex justify-content-end"
                        onSubmit={handleSubmit}
                      >
                        <div className="form-group mx-sm-3 mb-2">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter an amount in &#8358;"
                            onChange={(e) =>
                              setPostData({
                                ...postData,
                                processFee: e.target.value,
                              })
                            }
                          />
                        </div>
                        <button type="submit" className="btn btn-primary mb-2">
                          Assign cost
                        </button>
                      </form>
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

export default LawyerCases;
