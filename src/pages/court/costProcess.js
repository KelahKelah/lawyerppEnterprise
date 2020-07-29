import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const CostProcess = (props) => {
  const [courts, setCourts] = useState([]);

  const courtUrl = "/court/courts";
  
  useEffect(() => {
    Axios
    .get(courtUrl)
    .then(response => {
      console.log("response is: ", response.data.data) 
      setCourts(response.data.data)
    })
    .catch((error) => {
      console.log(error)
    });
  }, []);

  const handleClick = (co) => {
    // console.log("checking props" ,props)
    props.history.push(`/process/cost/${co._id}`)
    // console.log("checking id",courts._id)
  }

  return(
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Judicial Division</th>
            <th scope="col">Judge Role</th>
          </tr>
        </thead>
        <tbody> 
          {
          courts.length > 0 ? courts.map((c, i) => {
            return(
              <tr  onClick={() => {handleClick(c); }} >
                <th scope="row">{i + 1}</th>
                <td>{c.name_Of_court}</td>
                <td>{c.judicial_division}</td>
                <td>{c.judges.judge_role}</td>

              </tr>
            )
          }) : (null)
          }
          
        </tbody>
      </table>
    
  )

}
export default CostProcess;




































































































// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./court.css";
// import Loader from "../../components/pageLoader/loader";

// const CostProcess = (props) => {
//   const courtUrl = "/court/courts";
//   const [courts, setCourts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(courtUrl)
//       .then((result) => {
//         setIsLoading(false);
//         if (result.status === 200) {
//           setCourts(result.data.data);
//           console.log("courts", result.data.data);
//         }
//       })
//       .catch((error) => {
//         if (error.message === "Request failed with status code 401") {
//           props.setUnauthorized(true);
//         }
//       });
//   }, []);

//   const handleClick = (court) => {
//     props.history.push(`/process/cost/${court._id}`);
//   };

//   return isLoading ? (
//     <Loader />
//   ) : (
//     <div className="container mt-4">
//       <table className="table">
//         <thead className="thead-dark">
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Name</th>
//             <th scope="col">Judicial division</th>
//             {/* <th scope="col">Judge Role</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {courts.length > 0 &&
//             courts.map((court, i) => {
//               return (
//                 <tr
//                   className="c-pointer court-tr"
//                   data-target={`#moreInfo${i}`}
//                   data-toggle="modal"
//                   onClick={() => {
//                     handleClick(court);
                    
//                   }}
//                 >
//                   <th scope="row">{i + 1}</th>
//                   <td>{court.name_Of_court}</td>
//                   <td>{court.judicial_division}</td>
//                 </tr>
//               );
//             })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CostProcess;
