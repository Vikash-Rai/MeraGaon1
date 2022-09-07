import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    phone: ""
  });

  const { fname, lname, phone } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/api/post`, user);
    history.push(`/sendotp/${id}`);
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">User Detail</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your First Name"
              name="fname"
              value={fname}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          <label>Last Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Last Name"
              name="lname"
              value={lname}
              onChange={e => onInputChange(e)}
            />
          </div>
          
          <div className="form-group">
          <label>Phone Number</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone Number"
              name="phone"
              value={phone}
              onChange={e => onInputChange(e)}
            />
          </div>

          <button className="btn btn-warning btn-block">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
