import React, { useState, useEffect } from "react";
import axios from "axios";
import "./file_process.css";
import Loader from "../../components/loader/loader";
import Success from "../../components/success/success";

const FillFileProcess = (props) => {
  const [filer, setfiler] = useState("");
  const [counsel, setCounsel] = useState(false);
  const [party, setParty] = useState(false);
  const [data, setdata] = useState({
    mode_of_commencement: "",
    filing_as: "",
    clientname: "",
    lawyerId: "",
    lawfirmId: "",
    lawyerpp_cocounsil: "",
    opposing_party: "",
    opposing_lawyer: "",
    courtId: "",
    name: "",
    phone_number: "",
    whatsapp_number: "",
    email_address: "",
    facebook_Id: "",
    office_address: "",
    opposing_name: "",
    opposing_phone_number: "",
    opposing_whatsapp_number: "",
    opposing_email_address: "",
    opposing_facebook_id: "",
    opposing_office_address: "",
    certificate: "",
  });
  const [courts, setcourts] = useState([]);
  const [lawyers, setlawyers] = useState([]);
  const [lawFirms, setlawFirms] = useState([]);
  const [users, setUsers] = useState();
  const [loadStata, setloadState] = useState("notLoading");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchLawyers();
    fetchCourts();
    fetchUsers();
    fetchLawFirms();
  }, []);

  const toggleSetFiler = (e) => {
    setfiler(e.target.value);
    handleChange(e);
  };
  const fetchLawyers = () => {
    axios
      .get("https://lawyerppenterprise.herokuapp.com/api/court/lawyers")
      .then((res) => {
        setlawyers(res.data.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.message === "Request failed with status code 401") {
          props.setUnauthorized(true);
        }
      });
  };
  const fetchCourts = () => {
    axios
      .get("https://lawyerppenterprise.herokuapp.com/api/court/courts")
      .then((res) => {
        setcourts(res.data.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.message === "Request failed with status code 401") {
          props.setUnauthorized(true);
        }
      });
  };
  const fetchLawFirms = () => {
    axios
      .get("https://lawyerppserver.herokuapp.com/api/lawfirm/lawfirms")
      .then((res) => {
        console.log(res.data.data);
        setlawFirms(res.data.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.message === "Request failed with status code 401") {
          props.setUnauthorized(true);
        }
      });
  };
  const fetchUsers = () => {
    axios
      .get("https://lawyerppenterprise.herokuapp.com/api/court/users")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.message === "Request failed with status code 401") {
          props.setUnauthorized(true);
        }
      });
  };

  const handleChange = (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  console.log("data", data);
  const handleFile = (e) => {
    setdata({ ...data, certificate: e.target.files[0] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const files = new FormData();
    Object.keys(data).map((key) => {
      files.append(key, data[key]);
    });

    console.log(files);
    let url = "/fileprocess/create";
    setloadState("isLoading");
    axios
      .post(url, files)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setSuccess(true);
          setloadState("notLoading");
          // props.history.push("/process/view");
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.message === "Request failed with status code 401") {
          props.setUnauthorized(true);
        }
        setloadState("loadFailed");
      });
  };
  return success ? (
    <Success
      type="filedProcess"
      message="You have successfully filed a process"
      link="/process/view"
      direction="filed processes"
    />
  ) : (
    <div>
      <section className="sign-in-page bg-white align-process">
        <div className="align-self-center">
          <div className="sign-in-from">
            <h2 className="text-center border-bottom">File a Process</h2>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="row mx-0">
                <div className="col-sm-6">
                  <section>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Mode of commencement</label>
                    <select
                      id="inputState"
                      className="form-control"
                      name="mode_of_commencement"
                      onChange={handleChange}
                    >
                      <option></option>
                      <option>Writ of Summons</option>
                      <option>Originating Summons</option>
                      <option>Originating Motion</option>
                      <option>Petition</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">
                      Who are you filing as?
                    </label>
                    <select
                      id="inputState"
                      className="form-control"
                      value={filer}
                      name="filing_as"
                      onChange={toggleSetFiler}
                    >
                      <option></option>
                      <option value="client">Client</option>
                      <option value="lawyer">Lawyer</option>
                    </select>
                  </div>
                  {filer === "client" ? (
                    <div className="form-group">
                      <label for="exampleInputEmail1">Client</label>
                      <select
                        id="inputState"
                        className="form-control"
                        name="clientname"
                        onChange={handleChange}
                      >
                        <option></option>
                        {users &&
                          users.length > 0 &&
                          users.map((user, i) => (
                            <option value={user._id} key={i}>
                              {user.first_name + " " + user.last_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  ) : filer === "lawyer" ? (
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="exampleInputEmail1">Lawyer Names</label>
                        <select
                          id="inputState"
                          className="form-control"
                          name="lawyerId"
                          onChange={handleChange}
                        >
                          <option></option>
                          {lawyers &&
                            lawyers.length > 0 &&
                            lawyers.map((lawyer, i) => (
                              <option key={i} value={lawyer._id}>
                                {lawyer.first_name + " " + lawyer.last_name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="form-group col-md-6">
                        <label for="exampleInputEmail1">Law firms</label>
                        <select
                          id="inputState"
                          className="form-control"
                          name="lawfirmId"
                          onChange={handleChange}
                        >
                          <option></option>
                          {lawFirms &&
                            lawFirms.length > 0 &&
                            lawFirms.map((lawFirm, i) => (
                              <option value={lawFirm._id} key={i}>
                                {lawFirm.name_of_firm}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  ) : null}
                  <div className="opposing-party">
                    <div className="form-group">
                      <label for="exampleInputEmail1">Select a counsel</label>
                      <select
                        id="inputState"
                        className="form-control"
                        name="lawyerpp_cocounsil"
                        onChange={handleChange}
                        disabled={counsel ? true : false}
                      >
                        <option></option>
                        {lawyers &&
                          lawyers.length > 0 &&
                          lawyers.map((lawyer, i) => (
                            <option value={lawyer._id} key={i}>
                              {lawyer.first_name + " " + lawyer.last_name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="counsel"
                        onClick={() => setCounsel(!counsel)}
                      />

                      <label for="customCheck1">
                        <small>
                          If your counsel is not listed here, check this box
                        </small>
                      </label>
                    </div>
                    {counsel ? (
                      <div>
                        <div className="form-group">
                          <label for="exampleInputEmail1">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter name"
                            name="name"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label for="exampleInputEmail1">Phone Number</label>
                            <input
                              type="number"
                              className="form-control"
                              id=""
                              aria-describedby="name"
                              placeholder="Enter Phone number"
                              name="phone_number"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label for="exampleInputEmail1">
                              WhatsApp Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter WhatsApp number"
                              name="whatsapp_number"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label for="exampleInputEmail1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id=""
                              aria-describedby="name"
                              placeholder="Enter email"
                              name="email_address"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label for="exampleInputEmail1">Facebook ID</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter Facebook ID"
                              name="facebook_id"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label for="exampleFormControlTextarea1">
                            Office Address
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            name="office_address"
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  </section>
                </div>
                <div className="col-sm-6">
                  <div className="opposing-party">
                    <div className="form-group">
                      <label for="exampleInputEmail1">
                        Select an Opposing party
                      </label>
                      <select
                        id="inputState"
                        className="form-control"
                        disabled={party ? true : false}
                        onChange={handleChange}
                        name="opposing_party"
                      >
                        <option></option>
                        {lawyers &&
                          lawyers.length > 0 &&
                          lawyers.map((lawyer, i) => (
                            <option value={lawyer._id} key={i}>
                              {lawyer.first_name + " " + lawyer.last_name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="d-inline-block mt-2 pt-1">
                      <input
                        type="checkbox"
                        id="party"
                        onClick={() => setParty(!party)}
                      />
                      <label for="customCheck1">
                        <small>
                          If your opposing party is not listed here, check this
                          box
                        </small>
                      </label>
                    </div>
                    {party ? (
                      <div>
                        <div className="form-group">
                          <label for="exampleInputEmail1">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter name"
                            name="opposing_name"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label for="exampleInputEmail1">Phone Number</label>
                            <input
                              type="number"
                              className="form-control"
                              id=""
                              aria-describedby="name"
                              placeholder="Enter Phone number"
                              name="opposing_phone_number"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label for="exampleInputEmail1">
                              WhatsApp Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter WhatsApp number"
                              name="opposing_whatsapp_number"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label for="exampleInputEmail1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id=""
                              aria-describedby="name"
                              placeholder="Enter email"
                              name="opposing_email_address"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label for="exampleInputEmail1">Facebook ID</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter Facebook ID"
                              name="opposing_facebook_id"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label for="exampleFormControlTextarea1">
                            Office Address
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            name="opposing_office_address"
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </div>
                    ) : null}
                    <div className="form-group">
                      <label for="exampleInputEmail1">
                        Select an Opposing lawyer
                      </label>
                      <select
                        id="inputState"
                        className="form-control"
                        name="opposing_lawyer"
                        onChange={handleChange}
                      >
                        <option></option>
                        {lawyers &&
                          lawyers.length > 0 &&
                          lawyers.map((lawyer, i) => (
                            <option value={lawyer._id} key={i}>
                              {lawyer.first_name + " " + lawyer.last_name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Select a Court</label>
                      <select
                        id="inputState"
                        className="form-control"
                        name="courtId"
                        onChange={handleChange}
                      >
                        <option></option>
                        {courts &&
                          courts.length > 0 &&
                          courts.map((court, i) => (
                            <option value={court._id} key={i}>
                              {court.name_Of_court}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label for="exampleFormControlFile1">
                        Upload process document
                      </label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="exampleFormControlFile1"
                        name="certificate"
                        onChange={handleFile}
                      />
                    </div>
                    <div className="row ml-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block col-11 mr-1"
                      >
                        File Process
                      </button>
                      {loadStata === "isLoading" ? <Loader /> : null}
                    </div>
                    {loadStata === "loadFailed" ? (
                      <small className="d-flex justify-content-center">
                        Something went wrong, refresh and retry
                      </small>
                    ) : null}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
export default FillFileProcess;
