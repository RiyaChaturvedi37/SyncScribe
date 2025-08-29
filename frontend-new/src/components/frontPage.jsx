// import React from "react";
// import "./frontPage.css"; // styling
// import frontImage from "../assets/lightmodefrontpage.png";

// function FrontPage() {
//   return (
//     <div className="front-page">
//       <div className="image-container">
//         <img src={frontImage} alt="Front" className="front-image" />
//       </div>
//       <div className="overlay">
//         <h1>Welcome to SyncScribe 🚀</h1>
//         <p>Create, Edit & Share Documents Easily</p>
//         <button onClick={() => window.location.href = "/dashboard"}>Get Started</button>
//       </div>
//     </div>
//   );
// }

// export default FrontPage;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./frontPage.css";
// import lightImage from "../assets/lightmodefrontpage.png"; // make sure path matches
// // import darkImage from "./assets/darkmodefrontpage.png"; // optional if using dark mode

// export default function FrontPage() {
//   const navigate = useNavigate();

//   const handleGetStarted = () => {
//     navigate("/"); // Navigate to login page
//   };

//   return (
//     <div className="front-page">
//       <div className="front-image">
//         <img src={lightImage} alt="Front" />
//       </div>

//       <div className="front-content">
//         {/* Tagline removed as requested */}
//         <button className="get-started-btn" onClick={handleGetStarted}>
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./frontPage.css";

// // Import images
// import lightImage from "./assets/lightmodefrontpage.png";
// import darkImage from "./assets/darkmodefrontpage.png";

// export default function FrontPage() {
//   const navigate = useNavigate();
//   const [theme, setTheme] = useState("light");

//   // Toggle theme
//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   return (
//     <div className={`frontpage-container ${theme}`}>
//       {/* Image */}
//       <img
//         src={theme === "light" ? lightImage : darkImage}
//         alt="Front Page"
//         className="frontpage-image"
//       />

//       {/* Get Started button */}
//       <button className="btn get-started" onClick={() => navigate("/login")}>
//         Get Started
//       </button>

//       {/* Theme toggle */}
//       <button className="btn theme-toggle" onClick={toggleTheme}>
//         {theme === "light" ? "Dark Mode" : "Light Mode"}
//       </button>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./frontPage.css";
// import lightImage from "./assets/lightmodefrontpage.png";
// import darkImage from "./assets/darkmodefrontpage.png";

// export default function FrontPage() {
//   const navigate = useNavigate();
//   const [theme, setTheme] = useState("light");

//   const toggleTheme = () =>
//     setTheme(theme === "light" ? "dark" : "light");

//   const handleGetStarted = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="front-page">
//       {/* Background Image */}
//       <img
//         src={theme === "light" ? lightImage : darkImage}
//         alt="Front Page Background"
//         className="front-bg"
//       />

//       {/* Theme Toggle Button */}
//       <button className="theme-toggle" onClick={toggleTheme}>
//         {theme === "light" ? "Dark Mode" : "Light Mode"}
//       </button>

//       {/* Get Started Button */}
//       <button className="get-started" onClick={handleGetStarted}>
//         Get Started
//       </button>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./frontPage.css";
import lightImage from "./assets/lightmodefrontpage.png";
import darkImage from "./assets/darkmodefrontpage.png";

export default function FrontPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="front-page">
      {/* Background Image */}
      <img
        src={theme === "light" ? lightImage : darkImage}
        alt="Front Page Background"
        className="front-bg"
      />

      {/* Dark Mode Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      {/* Get Started Button */}
      <button className="get-started" onClick={handleGetStarted}>
        🚀 Get Started
      </button>
    </div>
  );
}
