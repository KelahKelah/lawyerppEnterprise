import React, { useState, useEffect } from "react";
// import axios from "axios";

import "./home.css";

const Home = (props) => {
  // const [homeDetails, sethomeDetails] = useState();

  // useEffect(() => {
  //   axios
  //     .get("/fileprocess/filer_filed_process")
  //     .then((res) => {
  //       console.log("allFileProcess", res.data.data);
  //       sethomeDetails(res.data.data);
  //     })
  //     .catch((error) => {
  //       console.log("ERROR", error.message);
  //       if (error.message === "Request failed with status code 401") {
  //         // props.setUnauthorized(true);
  //       }
  //     });
  // }, []);

  return (
    <div>
      <div className="header jumbotron align-centre text-white">
        <h1 className="text-white">Welcome to Lawyerpp</h1>
        <h4 className="text-white">Click the button below to file a process</h4>
        <a className="btn btn-primary get-btn" href="/process/fill">
          File a Process
        </a>
      </div>
      {/* {homeDetails &&
        homeDetails.length > 0 &&
        homeDetails.map((homeDetail, i) => {
          return (
            <div id="accordion">
              <div className="card">
                <div className="card-header" id={`headingOne${i}`}>
                  <h5 className="mb-0">
                    <button
                      className="btn btn-primary"
                      data-toggle="collapse"
                      data-target={`#collapseOne${i}`}
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Case {i + 1}
                    </button>
                  </h5>
                </div>

                <div
                  id={`collapseOne${i}`}
                  className="collapse"
                  aria-labelledby={`headingOne${i}`}
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. 3 wolf moon officia
                    aute, non cupidatat skateboard dolor brunch. Food truck
                    quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                    sunt aliqua put a bird on it squid single-origin coffee
                    nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    Leggings occaecat craft beer farm-to-table, raw denim
                    aesthetic synth nesciunt you probably haven't heard of them
                    accusamus labore sustainable VHS.
                  </div>
                </div>
              </div>
            </div>
          );
        })} */}
    </div>
  );
};
export default Home;
