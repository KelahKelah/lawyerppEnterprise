import React, { useEffect, useState } from "react";
import axios from "axios";
import "./court.css";
import Error from "../../components/error/error";
import Loader from "../../components/pageLoader/loader";
import Success from "../../components/success/success";

const JudgeCases = (props) => {
  const lawfirms = `/fileprocess/payed_processes?courtId=${props.match.params.id}`;
  const [cases, setCases] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [data, setdata] = useState({
    lawyerId: "",
    fileProcessId: "",
  });
  const [error, seterror] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(lawfirms)
      .then((result) => {
        setIsLoading(false);
        if (result.status === 200) {
          setCases(result.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "Request failed with status code 401") {
          props.setUnauthorized(true);
        }
        if (error.message === "Request failed with status code 404") {
          seterror("404");
        }
      });
    fetchLawyers();
  }, []);

  const fetchLawyers = () => {
    axios
      .get("/court/lawyers")
      .then((res) => {
        setLawyers(res.data.data);
        console.log("lawyers", res.data.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.message === "Request failed with status code 401") {
          props.setUnauthorized(true);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios
      .post(`/court/assign_matter?courtId=${props.match.params.id}`, data)
      .then((result) => {
        let $ = window.$;
        $(".modal-backdrop").remove();
        setSuccess(true);
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Request failed with status code 400") {
          seterror("400");
        }
      });
  };

  return success ? (
    <Success
      type="assignedLawyer"
      message="You have successfully assigned a lawyer to this process"
      link="/assign/lawyer"
      direction="processes"
    />
  ) : error === "404" ? (
    <Error
      message="404"
      advice="You are not designated to this court"
      link="/assign/lawyer"
    />
  ) : error === "400" ? (
    <Error
      message="400"
      advice="This case has already been assigned to a judge"
      link="/assign/lawyer"
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
            <th></th>
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
                  onClick={(e) =>
                    setdata({ ...data, fileProcessId: singleCase._id })
                  }
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
                        className="btn btn-primary text-white"
                        href={`${singleCase.processImageUrl}`}
                        target="_blank"
                      >
                        file
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
                  className="modal-dialog modal-dialog-centered modal-lg"
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
                      <div className="row mx-0 my-4">
                        <div className="col-md-6">
                          <h5 className="">
                            <b>Mode of Commencement: </b>
                            <br />
                            {caseDetail.mode_of_commencement}
                          </h5>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex justify-content-end">
                            <form
                              className="form-inline"
                              onSubmit={handleSubmit}
                            >
                              <select
                                className="form-control mr-2"
                                onChange={(e) =>
                                  setdata({ ...data, lawyerId: e.target.value })
                                }
                              >
                                <option>pick lawyer to assign case</option>
                                {lawyers &&
                                  lawyers.length > 0 &&
                                  lawyers.map((lawyer, i) => (
                                    <option key={i} value={lawyer._id}>
                                      {lawyer.first_name +
                                        " " +
                                        lawyer.last_name}
                                    </option>
                                  ))}
                              </select>
                              <button type="submit" className="btn btn-primary">
                                Assign
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
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
                                {caseDetail.client_details.filer_name &&
                                  caseDetail.client_details.filer_name
                                    .first_name +
                                    " " +
                                    caseDetail.client_details.filer_name &&
                                  caseDetail.client_details.filer_name
                                    .last_name}
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
                                <b>Whatsapp number: </b>N/A
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
                                {caseDetail.courtId.judges.judicial_division}
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
                                <b>WhatsApp number: </b>
                                {caseDetail.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  caseDetail.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.whatsapp_number}
                              </small>
                              <br />
                              <small>
                                <b>Facebook ID: </b>
                                {caseDetail.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  caseDetail.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.facebook_id}
                              </small>
                              <br />
                              <small>
                                <b>Office Address: </b>
                                {caseDetail.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  caseDetail.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.office_address}
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

export default JudgeCases;
