import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem("token", json.authToken);
      console.log("submit clicked")
      navigate("/Login");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div>
        <Navbar />
      </div>

      <div className="container">
        <form
          className="w-50 m-auto mt-5 border  border-white rounded"
          style={{ padding: "10px", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onSubmit={handleSubmit}
        >
          <div className="m-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>

          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
            />
          </div>
          <div className="container">
            <button
              type="submit"
              className="btn btn-dark mb-3 mt-2 border-white"
            >
              Submit
            </button>

            <hr />
            <p style={{ padding: "2px" }}>
              {}Already have an account?{" "}
              <Link to="/login" className="text-danger">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
