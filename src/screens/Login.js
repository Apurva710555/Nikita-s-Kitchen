import { useState } from "react";
import React from "react";
import NFooter from "../components/NFooter";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter your valid credentials");
    }

    if (json.success) {
      localStorage.setItem("authToken", credentials.email);
      localStorage.setItem("userEmail", json.authToken);

      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        height: "100vh",  
        backgroundSize: "cover",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div className="container" style={{ marginTop: "145px" }}>
        <form
          className="w-50 m-auto mt-5 border  border-white rounded"
          style={{ padding: "10px",backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onSubmit={handleSubmit}
        >
          <div className="form-group ">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={credentials.email}
              onChange={onChange}
              name="email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={credentials.password}
              onChange={onChange}
              name="password"
            />
          </div>
          <div className="container">
          <button type="submit" className="btn btn-dark mb-3 mt-2 border-white">
            Submit
          </button>

          <hr />
          <p>New to Nikita's kitchen? <Link to="/Signup" className="text-danger">Create Account</Link></p>
          </div>
          

          
        </form>
      </div>
    </div>
  );
}
