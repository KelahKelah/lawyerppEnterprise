import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import Loader from "../../components/pageLoader/loader";

const ViewOrganiztions = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        "https://lawyerppenterprise.herokuapp.com/api/corporg/user_orgs/:15/:1"
      )
      .then((result) => {
        setLoading(false);
        setOrganizations(result.data.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return organizations.length === 0 ? (
    <h1 className="text-center">No Organization created yet!</h1>
  ) : loading ? (
    <Loader />
  ) : (
    <div className="container mt-4">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name of Organization</th>
            <th scope="col">Type of Organization</th>
            <th scope="col">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {organizations &&
            organizations.map((organization, i) => {
              return (
                <tr
                  className="c-pointer court-tr"
                  data-target={`#moreInfo${i}`}
                  data-toggle="modal"
                >
                  <th scope="row">{i + 1}</th>
                  <td>{organization.Name_of_organisation}</td>
                  <td>{organization.Type_of_Organisation}</td>
                  <td>
                    {moment(
                      organization.createdAt,
                      "YYYY-MM-DDTHH:mm:ss"
                    ).format("DD/MM/YYYY")}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <section>
        {organizations &&
          organizations.map((organization, i) => {
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
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body row">
                      <div className="col-6 border-left">
                        <h3 className="mt-1">Organization Details</h3>
                        <ul>
                          <li className="staff_list">
                            <small>
                              <b>Name of Organization: </b>
                              {organization.Name_of_organisation}
                            </small>
                            <br />
                            <small>
                              <b>Type of Organization: </b>
                              {organization.Type_of_Organisation}
                            </small>
                            <br />
                            <small>
                              <b>Type of Government MDA: </b>
                              {organization.Type_of_Government_MDA}
                            </small>
                            <br />
                            <small>
                              <b>Contact Email: </b>
                              {organization.Email_address}
                            </small>
                            <br />
                            <small>
                              <b>Contact Number: </b>
                              {organization.Contact_number}
                            </small>
                            <br />
                            <small>
                              <b>Contact Address: </b>
                              {organization.Contact_address}
                            </small>

                            <br />
                            <small>
                              <b>Website: </b>
                              {organization.Website
                                ? organization.Website
                                : "-"}
                            </small>
                            <br />
                            <small>
                              <b>Date created: </b>
                              {moment(
                                organization.createdAt,
                                "YYYY-MM-DDTHH:mm:ss"
                              ).format("DD/MM/YYYY")}
                            </small>
                          </li>
                        </ul>
                      </div>
                      <div className="col-6 border-left">
                        <h3 className="mt-1">Owner Details</h3>
                        <ul>
                          <li className="staff_list">
                            <small>
                              <b>Name: </b>
                              {organization.OwnerId.first_name +
                                " " +
                                organization.OwnerId.last_name}
                            </small>
                            <br />
                            <small>
                              <b>Email: </b>
                              {organization.OwnerId.email_address}
                            </small>
                            <br />
                            <small>
                              <b>Phone Number: </b>
                              {organization.OwnerId.phone_number}
                            </small>
                            <br />
                            <small>
                              <b>User Type: </b>
                              {organization.OwnerId.user_type}
                            </small>
                          </li>
                        </ul>
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

export default ViewOrganiztions;
