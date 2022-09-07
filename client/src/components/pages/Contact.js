import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Contact = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUser(result.data);
    // setUser(result.data.reverse());

  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:3003/users/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
      <div>
        <Link to="/users/add">
          <button className="btn btn-primary btn-block">Add New Contact</button>
        </Link>
      </div>
      <hr/>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>{`+91-${user.phone}`}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/users/edit/${user.id}`}>
                    View
                  </Link>
                  {/* <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contact;
