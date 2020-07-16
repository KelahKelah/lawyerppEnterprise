import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../components/pageLoader/loader";
import Success from "../../components/success/success";

const ViewFileProcesses = (props) => {
  const [allFileProcesses, setAllFileProcesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(true)
  const viewFileProcessesUrl = "/fileprocess/filer_filed_process";


  useEffect(() => {
    axios
      .get(viewFileProcessesUrl)
      .then((res) => {
        setIsLoading(false);
        console.log("allFileProcess", res.data.data);
        console.log("we", res);
        setAllFileProcesses(res.data.data);
        setDisabled(false)
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        if (error.message === "Request failed with status code 401") {
          props.setUnauthorized(true);
        }
      });

      // axios
      // .get()
      // .then((response) => {
      //   if(true) {
      //     console.log(allAssignedLawyer)
      //   }
      // })

  }, []);

  console.log(disabled)

  
   return  isLoading ? (
    <Loader />
  ) : (
    <div className="container mt-4">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Filer</th>
            <th scope="col">Mode of commencement</th>
            <th scope="col">Amount (&#8358;)</th>
            <th scope="col">Lawyer</th>
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
                  >{allFileProcesses.filing_as}
                  </td>

                  <td  
                    className="c-pointer allFileProcesses-tr"
                    data-target={`#moreInfo${i}`}
                    data-toggle="modal"
                  >{allFileProcesses.mode_of_commencement}
                  </td>

                  <td  
                    className="c-pointer allFileProcesses-tr"
                    data-target={`#moreInfo${i}`}
                    data-toggle="modal"
                  >{allFileProcesses.amount || " - "}
                  </td>
                  <td>
                    <button type='button' className={`${disabled?"disabled":""} btn btn-primary text-white`} data-toggle='' data-target='' target='' disabled={disabled}>View assigned Lawyer</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
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
                                {(caseDetail.client_details.filer_name &&
                                  caseDetail.client_details.filer_name
                                    .first_name +
                                    " " +
                                    caseDetail.client_details.filer_name &&
                                  caseDetail.client_details.filer_name
                                    .last_name) ||
                                  "N/A"}
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
                                <b>Whatsapp number: </b>N/A
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
                                Co-counsil
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
                                Lawyerpp Co-counsil
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
                                    .lawyerpp_cocounsil_id.whatsapp_number) ||
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
                                .opposing_lawyer_id == null ? (
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
                                        .lawyerpp_cocounsil_id.first_name +
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
                                <b>Enrolment number: </b>
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
                                <b>WhatsApp number: </b>
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
