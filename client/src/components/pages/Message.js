import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Message = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:5000/api/get");
    setUser(result.data);
    // setUser(result.data.reverse());

  };


  return (
    <div className="container">
      <div className="py-4">
      <div>
          <button className="btn btn-primary btn-block">List of Messages Sent</button>
      </div>
      <hr/>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone</th>
              <th scope="col">OTP Sent</th>
              <th scope="col">Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{`+91-${user.phone}`}</td>
                <td>{user.otp}</td>
                <td>{user.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Message;
