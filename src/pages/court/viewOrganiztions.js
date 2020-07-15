import React, { useEffect } from "react";
import axios from "axios";

const ViewOrganiztions = () => {
  useEffect(() => {
    axios
      .get(
        "https://lawyerppenterprise.herokuapp.com/api/corporg/user_orgs/:15/:1"
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="container mt-4">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name of Organization</th>
            <th scope="col"></th>
            <th scope="col">Opposing Party</th>
            <th scope="col">Opposing Lawyer</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            className="c-pointer court-tr"
            data-target="#moreInfo"
            data-toggle="modal"
          >
            <th scope="row">1</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrganiztions;
