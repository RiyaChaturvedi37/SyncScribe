// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";


// function Signup() {
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();
//     // 👇 Abhi demo ke liye signup ke baad login bhejenge
//     navigate("/login");
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Signup Page</h2>
//       <form onSubmit={handleSignup}>
//         <input type="text" placeholder="Name" required /><br /><br />
//         <input type="email" placeholder="Email" required /><br /><br />
//         <input type="password" placeholder="Password" required /><br /><br />
//         <button type="submit">Signup</button>
//       </form>
//       <p>
//         Already have an account? <a href="/login">Login</a>
//       </p>
//     </div>
//   );
// }

// export default Signup;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// function Signup() {
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();
//     // abhi ke liye signup ke baad login pe bhejenge
//     navigate("/login");
//   };

//   return (
//     <div className="form-container">
//       <h2>Signup Page</h2>
//       <form onSubmit={handleSignup}>
//         <input type="text" placeholder="Full Name" required />
//         <input type="email" placeholder="Email" required />
//         <input type="password" placeholder="Password" required />
//         <button type="submit">Signup</button>
//       </form>
//       <p>
//         Already have an account? <a href="/login">Login</a>
//       </p>
//     </div>
//   );
// }

// export default Signup;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// function Signup() {
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();
//     navigate("/login");
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <h2>Signup</h2>
//         <form onSubmit={handleSignup}>
//           <input type="text" placeholder="Name" required />
//           <input type="email" placeholder="Email" required />
//           <input type="password" placeholder="Password" required />
//           <button type="submit">Signup</button>
//         </form>
//         <p>
//           Already have an account? <a href="/login">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./App.css";

// function Signup() {
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();
//     navigate("/dashboard");
//   };

//   return (
//     <div className="container">
//       <div className="left">
//         <h2>Signup</h2>
//         <form onSubmit={handleSignup}>
//           <input type="text" placeholder="Full Name" required />
//           <input type="email" placeholder="Email" required />
//           <input type="password" placeholder="Password" required />
//           <button type="submit">Signup</button>
//         </form>
//         <p>
//           Already have an account? <Link to="/">Login</Link>
//         </p>
//       </div>
//       <div className="right"></div>
//     </div>
//   );
// }

// export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData); 
      alert("Signup successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="container">
      <div className="left">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Signup;
