import React, { useState, useRef, useEffect } from "react";
import { CartPlusFill } from "react-bootstrap-icons";
import { useCart, useDispatchCart } from "./ContextReducer";
import Login from "../screens/Login";
import { useNavigate } from "react-router";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  let foodItem = props.item;
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const priceRef = useRef();
  let finalPrice = qty * parseInt(options[size]);
  let navigate = useNavigate();

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const token = localStorage.getItem('token');
const [isLoggedIn, setIsLoggedIn] = [Boolean(token), false];


  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      // Redirect to the login page
      navigate("/Login"); // Assuming "/Login" is the login route
      return;
    } else {
      let food = [];
      for (const item of data) {
        if (item.id === props.foodItem._id) {
          food = item;

          break;
        }
      }
      console.log(food);
      console.log(new Date());
      if (food !== 0) {
        if (food.size === size) {
          await dispatch({
            type: "UPDATE",
            id: props.foodItem._id,
            price: finalPrice,
            qty: qty,
          });
          return;
        } else if (food.size !== size) {
          await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size,
            img: props.ImgSrc,
          });
          console.log("Size different so simply ADD one more to the list");
          return;
        }
        return;
      }

      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }

    // setBtnEnable(true)
  };

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "420px" }}>
        <div
          style={{
            width: "18rem",
            height: "340px",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <img
            src={props.foodItem.img}
            alt="..."
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div className="card-body">
          <h5 className="card-title my-3 text-center fw-bold text-decoration-underline lead">
            {props.foodItem.name}
          </h5>
          <p className="card-text">{/* <small>{props.desCptn}</small> */}</p>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-dark rounded"
              onChange={(e) => {
                setQty(e.target.value);
              }}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-dark rounded"
              ref={priceRef}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <ul style={{ listStyleType: "none" }}>
              <li>
                <div
                  className="d-inline h-100 fs-5 fst-italic"
                  style={{ fontSize: "15px", padding: "5px 10px" }}
                >
                  Price: ₹{qty * parseInt(options[size] || 0)}/-
                </div>
              </li>
            </ul>

            <div className="container text-center">
              <button
                className="btn btn-dark justify-center my-3"
                style={{ fontSize: "15px", padding: "5px 10px" }}
                onClick={handleAddToCart}
              >
                Add Cart
                <CartPlusFill className="mx-2 mb-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
