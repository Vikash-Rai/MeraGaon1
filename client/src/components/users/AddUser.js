import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

const AddUser = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    fname: "",
    lname: "", 
    phone: ""
  });

  const { fname, lname, phone } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:3003/users", user);
    history.push("/contact");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A User</h2>
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
              required
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
              required
            />
          </div>
          <div className="form-group">
          <label>Phone Number [10 digit phone number]</label>
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Your 10 digit Phone Number"
              name="phone"
              value={phone}
              onChange={e => onInputChange(e)}
              required
            />
          </div>
          <button className="btn btn-primary btn-block">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
