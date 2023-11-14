import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import NFooter from "../components/NFooter";



export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade container-fluid p-0"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div
          className="carousel-inner "
          id="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div
            className="carousel-caption d-none d-md-block"
            style={{ zIndex: "10" }}
          >
            <div className="d-flex justify-content-center"  role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
              />
              
              
            </div>
          </div>
          <div className="carousel-item active m-20 ">
            <img
              src="https://source.unsplash.com/random/900×700/?burger"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?pizza"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900×700/?sandwich"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div className="row mb-3 " key={data._id}>
              <div className="fs-1 fw-bold text-center m-3">{data.CategoryName}</div>
              <hr />
              {foodItem.length > 0 ? ( 
                foodItem
                  .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map((filterItems) => (
                    <div
                      key={filterItems._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        foodItem = {filterItems}
                        options={filterItems.options[0]}
                        
                        // desCptn={filterItems.description}
                      />
                    </div>
                  ))
              ) : ( 
                <div>No Such Data Found</div>
              )}
            </div>
          ))
        ) : (
          <div>No Food Categories Found</div>
        )}
      </div>
      <div>
        <NFooter />
      </div>
    </div>
  );
}