import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/pageLoader/loader";

const ViewSingleProcess = (props) => {
  const [caseDetail, setCaseDetail] = useState({});
  const [laoding, setLaoding] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://lawyerppenterprise.herokuapp.com/api/fileprocess/process_detail?processId=${props.match.params.id}`
      )
      .then((res) => {
        setCaseDetail(res.data.data);
        setLaoding(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return laoding ? (
    <Loader />
  ) : (
    <div>
      <h1 className="text-center mt-5">Filed Process</h1>
      <div className="">
        <h6 className="mt-3 ml-5">
          <b>Mode of Commencement: </b>
          {Object.keys(caseDetail).length > 0 &&
            caseDetail.mode_of_commencement}
        </h6>
        <h6 className="ml-5">
          {Object.keys(caseDetail).length > 0 && caseDetail.amount ? (
            <div>
              <b>Amount: </b>
              &#8358;
              {Object.keys(caseDetail).length > 0 && caseDetail.amount}
            </div>
          ) : (
            <div>
              <b>Amount: </b>
              This case hasn't been costed yet
            </div>
          )}
        </h6>
        {caseDetail.processImageUrl != null ? (
          <a
            className="btn btn-primary btn-sm ml-5 mb-3"
            href={`${caseDetail.processImageUrl}`}
          >
            View Process document
          </a>
        ) : (
          <b>No Certificate was uploaded</b>
        )}
        <div className="row mx-0">
          <div className="col-11 mx-auto">
            <div className="staff_list row mx-0">
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 border-left">
                <b className="border-bottom border-dark">Client Details</b>
                <br />
                <small>
                  <b>Client name: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail &&
                    caseDetail.client_details.filer_name.first_name +
                      " " +
                      caseDetail &&
                    caseDetail.client_details.filer_name.last_name) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Email address: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.client_details.filer_name &&
                    caseDetail.client_details.filer_name.email_address) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Phone Number: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.client_details.filer_name &&
                    caseDetail.client_details.filer_name.phone_number) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Whatsapp number: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.client_details.filer_name &&
                    caseDetail.client_details.filer_name.phone_number) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>User Type: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.client_details.filer_name &&
                    caseDetail.client_details.filer_name.user_type) ||
                    "N/A"}
                </small>
                <br />
                <br />
                <b className="border-bottom border-dark">Co-counsel</b>
                <br />
                <small>
                  <b>Client name: </b>
                  {caseDetail.cocounsil &&
                  Array.isArray(caseDetail.cocounsil) &&
                  caseDetail.cocounsil[0].cocounsil_id
                    ? caseDetail.cocounsil[0].cocounsil_id.first_name +
                      " " +
                      caseDetail.cocounsil[0].cocounsil_id.last_name
                    : "N/A"}
                </small>
                <br />
                <small>
                  <b>Email address: </b>
                  {caseDetail.cocounsil &&
                  Array.isArray(caseDetail.cocounsil) &&
                  caseDetail.cocounsil[0].cocounsil_id
                    ? caseDetail.cocounsil[0].cocounsil_id.email_address
                    : "N/A"}
                </small>
                <br />
                <small>
                  <b>Phone Number: </b>
                  {caseDetail.cocounsil &&
                  Array.isArray(caseDetail.cocounsil) &&
                  caseDetail.cocounsil[0].cocounsil_id
                    ? caseDetail.cocounsil[0].cocounsil_id.phone_number
                    : "N/A"}
                </small>
                <br />
                <small>
                  <b>WhatsApp number: </b>
                  {caseDetail.cocounsil &&
                  Array.isArray(caseDetail.cocounsil) &&
                  caseDetail.cocounsil[0].cocounsil_id
                    ? caseDetail.cocounsil[0].cocounsil_id.whatsapp_number
                    : "N/A"}
                </small>
                <br />
                <small>
                  <b>Facebook ID: </b>
                  {caseDetail.cocounsil &&
                  Array.isArray(caseDetail.cocounsil) &&
                  caseDetail.cocounsil[0].cocounsil_id
                    ? caseDetail.cocounsil[0].cocounsil_id.facebook_id
                    : "N/A"}
                </small>
                <br />
                <small>
                  <b>Office Address: </b>
                  {caseDetail.cocounsil &&
                  Array.isArray(caseDetail.cocounsil) &&
                  caseDetail.cocounsil[0].cocounsil_id
                    ? caseDetail.cocounsil[0].cocounsil_id.office_address
                    : "N/A"}
                </small>
                <br />
                <br />
                <b className="border-bottom border-dark">Court Details</b>
                <br />
                <small>
                  <b>Court Designation: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.courtId &&
                    caseDetail.courtId.courts_designations[0]
                      .court_designation) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Judicial Division: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.courtId &&
                    caseDetail.courtId.judicial_division) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Judge court designation: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.courtId &&
                    caseDetail.courtId.judges[0].judge_court_designation) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Judge role: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.courtId &&
                    caseDetail.courtId.judges[0].judge_role) ||
                    "N/A"}
                </small>
                <br />
                <br />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 border-left">
                <b className="border-bottom border-dark">Law Firm Details</b>
                <br />
                <small>
                  <b>N/A</b>
                </small>
                <br />
                <br />
                <b className="border-bottom border-dark">Lawyerpp Co-counsel</b>
                <br />
                <small>
                  <b>Name: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.lawyerpp_cocounsil[0].lawyerpp_cocounsil_id &&
                    caseDetail.lawyerpp_cocounsil[0].lawyerpp_cocounsil_id
                      .first_name +
                      " " +
                      caseDetail.lawyerpp_cocounsil[0].lawyerpp_cocounsil_id
                        .last_name) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Email address: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.lawyerpp_cocounsil[0].lawyerpp_cocounsil_id &&
                    caseDetail.lawyerpp_cocounsil[0].lawyerpp_cocounsil_id
                      .email_address) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Phone Number: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.lawyerpp_cocounsil[0].lawyerpp_cocounsil_id &&
                    caseDetail.lawyerpp_cocounsil[0].lawyerpp_cocounsil_id
                      .phone_number) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>WhatsApp number: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.lawyerpp_cocounsil[0].lawyerpp_cocounsil_id &&
                    caseDetail.lawyerpp_cocounsil[0].lawyerpp_cocounsil_id
                      .phone_number) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Enrolment Number: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.lawyerpp_cocounsil[0].lawyerpp_cocounsil_id &&
                    caseDetail.lawyerpp_cocounsil[0].lawyerpp_cocounsil_id
                      .enrollment_number) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Facebook ID: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.lawyerpp_cocounsil[0].lawyerpp_cocounsil_id &&
                    caseDetail.lawyerpp_cocounsil[0].lawyerpp_cocounsil_id
                      .facebook_id) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Office Address: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.lawyerpp_cocounsil[0].lawyerpp_cocounsil_id &&
                    caseDetail.lawyerpp_cocounsil[0].lawyerpp_cocounsil_id
                      .office_address) ||
                    "N/A"}
                </small>
                <br />
                <br />
                <b className="border-bottom border-dark">
                  Lawyerpp Opposing party
                </b>
                <br />
                <small>
                  <b>Name: </b>
                  {caseDetail.cocounsil &&
                  Array.isArray(caseDetail.lawyerpp_opposing_party) &&
                  caseDetail.lawyerpp_opposing_party[0]
                    .lawyerpp_opposing_party_Id
                    ? caseDetail.lawyerpp_opposing_party[0]
                        .lawyerpp_opposing_party_Id.first_name +
                      " " +
                      caseDetail.lawyerpp_opposing_party[0]
                        .lawyerpp_opposing_party_Id.last_name
                    : "N/A"}
                </small>
                <br />
                <small>
                  <b>Email address: </b>
                  {caseDetail.cocounsil &&
                  Array.isArray(caseDetail.lawyerpp_opposing_party) &&
                  caseDetail.lawyerpp_opposing_party[0]
                    .lawyerpp_opposing_party_Id
                    ? caseDetail.lawyerpp_opposing_party[0]
                        .lawyerpp_opposing_party_Id.email_address
                    : "N/A"}
                </small>
                <br />
                <small>
                  <b>Phone Number: </b>
                  {caseDetail.cocounsil &&
                  Array.isArray(caseDetail.lawyerpp_opposing_party) &&
                  caseDetail.lawyerpp_opposing_party[0]
                    .lawyerpp_opposing_party_Id
                    ? caseDetail.lawyerpp_opposing_party[0]
                        .lawyerpp_opposing_party_Id.phone_number
                    : "N/A"}
                </small>
                <br />
                <small>
                  <b>Enrolment Number: </b>
                  {caseDetail.cocounsil &&
                  Array.isArray(caseDetail.lawyerpp_opposing_party) &&
                  caseDetail.lawyerpp_opposing_party[0]
                    .lawyerpp_opposing_party_Id
                    ? caseDetail.lawyerpp_opposing_party[0]
                        .lawyerpp_opposing_party_Id.enrollment_number
                    : "N/A"}
                </small>
                <br />
                <br />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 border-left">
                <b className="border-bottom border-dark">Opposing Lawyer</b>
                <br />
                <small>
                  <b>Name: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.opposing_lawyers[0].opposing_lawyer_id &&
                    caseDetail.opposing_lawyers[0].opposing_lawyer_id
                      .first_name +
                      " " +
                      caseDetail.opposing_lawyers[0].opposing_lawyer_id
                        .last_name) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Email address: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.opposing_lawyers[0].opposing_lawyer_id &&
                    caseDetail.opposing_lawyers[0].opposing_lawyer_id
                      .email_address) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Phone Number: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.opposing_lawyers[0].opposing_lawyer_id &&
                    caseDetail.opposing_lawyers[0].opposing_lawyer_id
                      .phone_number) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Enrolment Number: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.opposing_lawyers[0].opposing_lawyer_id &&
                    caseDetail.opposing_lawyers[0].opposing_lawyer_id
                      .enrollment_number) ||
                    "N/A"}
                </small>
                <br />
                <br />
                <b className="border-bottom border-dark">Opposing Party</b>
                <br />
                <small>
                  <b>Name: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.opposing_party[0].opposing_party_Id &&
                    caseDetail.opposing_party[0].opposing_party_Id
                      .opposing_name) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Email address: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.opposing_party[0].opposing_party_Id &&
                    caseDetail.opposing_party[0].opposing_party_Id
                      .email_address) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Phone Number: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.opposing_party[0].opposing_party_Id &&
                    caseDetail.opposing_party[0].opposing_party_Id
                      .opposing_phone_number) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>WhatsApp Number: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.opposing_party[0].opposing_party_Id &&
                    caseDetail.opposing_party[0].opposing_party_Id
                      .opposing_whatsapp_number) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Facebook ID: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.opposing_party[0].opposing_party_Id &&
                    caseDetail.opposing_party[0].opposing_party_Id
                      .opposing_facebook_id) ||
                    "N/A"}
                </small>
                <br />
                <small>
                  <b>Office Address: </b>
                  {(Object.keys(caseDetail).length > 0 &&
                    caseDetail.opposing_party[0].opposing_party_Id &&
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
  );
};

export default ViewSingleProcess;
