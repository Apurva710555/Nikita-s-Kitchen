import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HouseDoorFill } from "react-bootstrap-icons";
import { Badge } from "react-bootstrap";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart} from '../components/ContextReducer';
export default function Navbar() {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  let data = useCart();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black ">
        <div className="container-fluid ">
          <div className="fs-4 ">Nikita's Kitchen</div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link mx-3" aria-current="page" to="/">
                  <HouseDoorFill className="mb-1 mx-1" />
                  Home
                </Link>
              </li>
              <li className="d-flex  navbar-nav me-auto mb-2 mb-lg-0">
                    <Link className="nav-link" to="/About">
                      About Us
                    </Link>
                  </li>
              

              {localStorage.getItem("authToken") ? (
                <li className="d-flex  navbar-nav me-auto mb-2 mb-lg-0">
                  <Link className="nav-link" to="/myorder">
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex ">
                <div className="d-flex">
                 
                  <li className="d-flex  navbar-nav me-auto mb-2 mb-lg-0">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="d-flex  navbar-nav me-auto mb-2 mb-lg-0">
                    <Link className="nav-link" to="/Signup">
                      Signup
                    </Link>
                  </li>
                </div>
              </div>
            ) : (
              <div>
                <div className="btn bg-dark text-white mx-2" onClick={()=>{setCartView(true)}}>
                  My Cart
                  <Badge className="mx-1" pill bg="danger">
                    {data.length}
                  </Badge>
                </div>
                {cartView?<Modal onClose={()=>{setCartView(false)}}><Cart/></Modal>:null }
                <div className="btn bg-dark  text-white" onClick={handleLogOut}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
