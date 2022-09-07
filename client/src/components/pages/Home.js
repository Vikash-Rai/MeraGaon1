import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
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

      <h2 className="text-center mb-4">Mera Gaon App</h2>
      <div>
        <Link to='/contact'>
          <button className="btn btn-primary btn-block">List of contacts</button>
        </Link>
      </div>
      <hr/>
      <div>
        <Link to='/message'>
          <button className="btn btn-primary btn-block">List of messages sent</button>
        </Link>
      </div>


    </div>
  );
};

export default Home;
