import React, { useEffect, useState } from "react";
import axios from "axios";
import "./court.css";
import Loader from "../../components/pageLoader/loader";

const CourtsForJudge = (props) => {
  const courtUrl = "/court/courts";
  const [courts, setCourts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  const handleClick = (court) => {
    props.history.push(`/assign/lawyer/${court._id}`);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container mt-4">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Judicial division</th>
            {/* <th scope="col">Judge Role</th> */}
          </tr>
        </thead>
        <tbody>
          {courts.length > 0 &&
            courts.map((court, i) => {
              return (
                <tr
                  className="c-pointer court-tr"
                  data-target={`#moreInfo${i}`}
                  data-toggle="modal"
                  onClick={() => {
                    handleClick(court);
                  }}
                >
                  <th scope="row">{i + 1}</th>
                  <td>{court.name_Of_court}</td>
                  <td>{court.judicial_division}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CourtsForJudge;
