import React, { useEffect, useState } from "react";
import axios from "axios";
import Error from "../../components/error/error";
import "./payment.css";
import Loader from "../../components/pageLoader/loader";
import moment from "moment";
import Success from "../../components/success/success";

const Payment = (props) => {
  const [costedProcesses, setcostedProcesses] = useState([]);
  const [data, setdata] = useState([]);
  const [error, seterror] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  var token = JSON.parse(localStorage.getItem("userData")).token;
  console.log(token);

  useEffect(() => {
    axios
      .get("/fileprocess/filer_costed_process")
      .then((res) => {
        setIsLoading(false);
        setcostedProcesses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "Request failed with status code 401") {
          seterror("401");
        }
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios
    .post(`/fileprocess/filer_payment?processId=${data}`)
    .then((response) => {
      console.log(response);
      if (response.status == 200) {
        let $ = window.$;
        $(".modal-backdrop").remove();
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return success ? (
    <Success
      type="paid"
      message="You have successfully paid for this process"
    />
  ) : error === "401" ? (
    <Error
      message="401"
      advice="You are not supposed to make this selection, log in as an authorised personnel"
      link="/login"
      button="to Home"
    />
  ) : isLoading ? (
    <Loader />
  ) : (
    <div className="container mt-4">
      <h3 className="text-center">
        This is a list of approved processes available for you to pay
      </h3>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Mode of commencement</th>
            <th scope="col">Date</th>
            <th scope="col">Price (&#8358;)</th>
          </tr>
        </thead>
        <tbody>
          {costedProcesses &&
            costedProcesses.length > 0 &&
            costedProcesses.map((costedProcess, i) => {
              return (
                <tr
                  className="c-pointer court-tr"
                  data-target={`#moreInfo${i}`}
                  data-toggle="modal"
                  onClick={() => setdata(costedProcess._id)}
                >
                  <th scope="row">{i + 1}</th>
                  <td>{costedProcess.mode_of_commencement}</td>
                  <td>
                    {moment(
                      costedProcess.createdAt,
                      "YYYY-MM-DDTHH:mm:ss"
                    ).format("DD/MM/YYYY")}
                  </td>
                  <td>{costedProcess.amount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <section>
        {costedProcesses &&
          costedProcesses.length > 0 &&
          costedProcesses.map((costedProcess, i) => {
            return (
              <div
                className="modal fade"
                tabIndex="-1"
                // id={"modal"}
                role="dialog"
                id={`moreInfo${i}`}
              >
                <div
                  className="modal-dialog modal-dialog-centered modal-xl"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header border-0">
                      <h5 className="modal-title ">Checkout</h5>
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
                        {costedProcess.mode_of_commencement}
                      </h6>
                      <h6 className="mt-3">
                        {costedProcess.amount ? (
                          <div>
                            <b>Amount: </b>
                            &#8358;
                            {costedProcess.amount}
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
                                {(costedProcess.client_details.filer_name &&
                                  costedProcess.client_details.filer_name
                                    .first_name +
                                    " " +
                                    costedProcess.client_details.filer_name &&
                                  costedProcess.client_details.filer_name
                                    .last_name) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Email address: </b>
                                {(costedProcess.client_details.filer_name &&
                                  costedProcess.client_details.filer_name
                                    .email_address) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Phone number: </b>
                                {(costedProcess.client_details.filer_name &&
                                  costedProcess.client_details.filer_name
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
                                {(costedProcess.client_details.filer_name &&
                                  costedProcess.client_details.filer_name
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
                                {(costedProcess.cocounsil[0].cocounsil_id &&
                                  costedProcess.cocounsil[0].cocounsil_id
                                    .name) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Email address: </b>
                                {(costedProcess.cocounsil[0].cocounsil_id &&
                                  costedProcess.cocounsil[0].cocounsil_id
                                    .email_address) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Phone number: </b>
                                {(costedProcess.cocounsil[0].cocounsil_id &&
                                  costedProcess.cocounsil[0].cocounsil_id
                                    .phone_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>WhatsApp number: </b>
                                {(costedProcess.cocounsil[0].cocounsil_id &&
                                  costedProcess.cocounsil[0].cocounsil_id
                                    .whatsapp_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Facebook ID: </b>
                                {(costedProcess.cocounsil[0].cocounsil_id &&
                                  costedProcess.cocounsil[0].cocounsil_id
                                    .facebook_id) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Office Address: </b>
                                {(costedProcess.cocounsil[0].cocounsil_id &&
                                  costedProcess.cocounsil[0].cocounsil_id
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
                                {(costedProcess.courtId
                                  .courts_designations[0] &&
                                  costedProcess.courtId.courts_designations[0]
                                    .court_designation) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Judicial Division: </b>
                                {costedProcess.courtId.judicial_division ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Judge court designation: </b>
                                {(costedProcess.courtId.judges[0] &&
                                  costedProcess.courtId.judges[0]
                                    .judge_court_designation) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Judge role: </b>
                                {(costedProcess.courtId.judges[0] &&
                                  costedProcess.courtId.judges[0].judge_role) ||
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
                                {(costedProcess.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  costedProcess.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.first_name +
                                    " " +
                                    costedProcess.lawyerpp_cocounsil[0]
                                      .lawyerpp_cocounsil_id.last_name) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Email address: </b>
                                {(costedProcess.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  costedProcess.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.email_address) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Phone number: </b>
                                {(costedProcess.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  costedProcess.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.phone_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>WhatsApp number: </b>
                                {(costedProcess.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  costedProcess.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.whatsapp_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Facebook ID: </b>
                                {(costedProcess.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  costedProcess.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.facebook_id) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Office Address: </b>
                                {(costedProcess.lawyerpp_cocounsil[0]
                                  .lawyerpp_cocounsil_id &&
                                  costedProcess.lawyerpp_cocounsil[0]
                                    .lawyerpp_cocounsil_id.office_address) ||
                                  "N/A"}
                              </small>
                              <br />
                              <br />
                              <b className="border-bottom border-dark">
                                Lawyerpp Opposing party
                              </b>
                              <br />
                              {costedProcess.lawyerpp_opposing_party[0]
                                .opposing_lawyer_id == null ? (
                                <small>
                                  <b>N/A</b>
                                </small>
                              ) : (
                                <div>
                                  <small>
                                    <b>Name: </b>
                                    {(costedProcess.lawyerpp_opposing_party &&
                                      costedProcess.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id &&
                                      costedProcess.lawyerpp_opposing_party[0]
                                        .lawyerpp_cocounsil_id.first_name +
                                        " " +
                                        costedProcess.lawyerpp_opposing_party[0]
                                          .lawyerpp_opposing_party_Id
                                          .last_name) ||
                                      "N/A"}
                                  </small>
                                  <br />
                                  <small>
                                    <b>Email address: </b>
                                    {(costedProcess.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      costedProcess.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id
                                        .email_address) ||
                                      "N/A"}
                                  </small>
                                  <br />
                                  <small>
                                    <b>Phone number: </b>
                                    {(costedProcess.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      costedProcess.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id
                                        .phone_number) ||
                                      "N/A"}
                                  </small>
                                  <br />
                                  <small>
                                    <b>Facebook ID: </b>
                                    {(costedProcess.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      costedProcess.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id
                                        .phone_number) ||
                                      "N/A"}
                                  </small>
                                  <br />
                                  <small>
                                    <b>WhatsApp number: </b>
                                    {(costedProcess.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      costedProcess.lawyerpp_opposing_party[0]
                                        .lawyerpp_opposing_party_Id
                                        .whatsapp_number) ||
                                      "N/A"}
                                  </small>
                                  <br />
                                  <small>
                                    <b>Office Address: </b>
                                    {(costedProcess.lawyerpp_opposing_party[0]
                                      .lawyerpp_opposing_party_Id &&
                                      costedProcess.lawyerpp_opposing_party[0]
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
                                {(costedProcess.opposing_lawyers[0]
                                  .opposing_lawyer_id &&
                                  costedProcess.opposing_lawyers[0]
                                    .opposing_lawyer_id.first_name +
                                    " " +
                                    costedProcess.opposing_lawyers[0]
                                      .opposing_lawyer_id.last_name) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Email address: </b>
                                {(costedProcess.opposing_lawyers[0]
                                  .opposing_lawyer_id &&
                                  costedProcess.opposing_lawyers[0]
                                    .opposing_lawyer_id.email_address) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Phone number: </b>
                                {(costedProcess.opposing_lawyers[0]
                                  .opposing_lawyer_id &&
                                  costedProcess.opposing_lawyers[0]
                                    .opposing_lawyer_id.phone_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Enrolment number: </b>
                                {(costedProcess.opposing_lawyers[0]
                                  .opposing_lawyer_id &&
                                  costedProcess.opposing_lawyers[0]
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
                                {(costedProcess.opposing_party[0]
                                  .opposing_party_Id &&
                                  costedProcess.opposing_party[0]
                                    .opposing_party_Id.opposing_name) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Email address: </b>
                                {(costedProcess.opposing_party[0]
                                  .opposing_party_Id &&
                                  costedProcess.opposing_party[0]
                                    .opposing_party_Id.email_address) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Phone number: </b>
                                {(costedProcess.opposing_party[0]
                                  .opposing_party_Id &&
                                  costedProcess.opposing_party[0]
                                    .opposing_party_Id.opposing_phone_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>WhatsApp number: </b>
                                {(costedProcess.opposing_party[0]
                                  .opposing_party_Id &&
                                  costedProcess.opposing_party[0]
                                    .opposing_party_Id
                                    .opposing_whatsapp_number) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Facebook ID: </b>
                                {(costedProcess.opposing_party[0]
                                  .opposing_party_Id &&
                                  costedProcess.opposing_party[0]
                                    .opposing_party_Id.opposing_facebook_id) ||
                                  "N/A"}
                              </small>
                              <br />
                              <small>
                                <b>Office Address: </b>
                                {(costedProcess.opposing_party[0]
                                  .opposing_party_Id &&
                                  costedProcess.opposing_party[0]
                                    .opposing_party_Id
                                    .opposing_office_address) ||
                                  "N/A"}
                              </small>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mx-0">
                        <form onSubmit={handleSubmit} className="col-12">
                          <button
                            className="btn btn-lg btn-primary btn-block col-12"
                            type="submit"
                            // data-dismiss="modal"
                          >
                            Pay &#8358;{costedProcess.amount}
                          </button>
                        </form>
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

export default Payment;
