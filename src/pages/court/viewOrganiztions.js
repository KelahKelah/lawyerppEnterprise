import React, { useEffect } from "react";
import axios from 'axios'

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
    <div>
      <h1>Created Organiztions</h1>
    </div>
  );
};

export default ViewOrganiztions;
