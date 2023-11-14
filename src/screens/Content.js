import React from "react";
import { Link } from "react-router-dom";

const containerStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
  padding: "20px", // Add some padding to the container for spacing
};

const fullWidthParagraphStyle = {
  width: "100%", // Make the paragraphs span the full width
  textAlign: "justify", // Justify text for a cleaner look
  padding:"10px"
};

const backgroundStyle = {
  backgroundImage: "url('https://images.unsplash.com/photo-1532009877282-3340270e0529?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  backgroundSize: "cover",  // Set the background image to cover the entire page
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  height: "100vh",  // Set the background to cover the full viewport height
};

export default function AboutUs() {
  return (
    <div style={backgroundStyle}>
      <div className="container" style={containerStyle}>
        <h1 className="text-black fw-bolder">ABOUT US</h1>
       <div className="text-black fs-4 fst-italic">
       <p  style={fullWidthParagraphStyle}>
          Welcome to Nikita's Kitchen, a place where culinary dreams take flight and flavors paint stories on your palate. Our journey is one of passion, creativity, and community.
        </p>
          
        <p style={fullWidthParagraphStyle}>
          Nikita, our visionary chef, embarked on a culinary adventure to bring the art of cooking to your plate. With a background in culinary arts and a heart full of dedication, she's the soul of our kitchen.
        </p>
        <p style={fullWidthParagraphStyle}>
          Our culinary philosophy is grounded in simplicity and quality. We believe in using the freshest, locally sourced ingredients to craft a menu that's as diverse as it is delectable. Every dish is a masterpiece, a testament to our commitment to taste and sustainability.
        </p>
        <p style={fullWidthParagraphStyle}>
          At Nikita's Kitchen, innovation meets tradition in the kitchen. We pride ourselves on our unique flavor combinations and the genuine passion we put into every recipe. Each dish is a journey, a delightful adventure for your taste buds.
        </p>
        <p style={fullWidthParagraphStyle}>
          We invite you to become part of our story, whether you're a seasoned food enthusiast or a newcomer to the world of flavors. Explore our menu, visit our food truck, and savor the delectable narratives crafted at Nikita's Kitchen.
        </p>
       </div>
        {/* Rest of your content here */}
        <Link to="/" className="btn btn-dark">Explore Our Menu</Link>
      </div>
    </div>
  );
}
