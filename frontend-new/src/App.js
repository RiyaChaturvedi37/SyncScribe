// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Login from "./components/login";
// import Signup from "./components/signup";
// import Dashboard from "./components/dashboard";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <nav>
//           <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
//         </nav>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/login";
// import Signup from "./components/signup";
// import Dashboard from "./components/dashboard";
// import React from "react";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }
// function App() {
//   return (
//     <div className="app">
//       <h1>Welcome to Cloud Doc Editor 🚀</h1>
//       <p>Edit your documents online in real-time!</p>
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/login";
// import Signup from "./components/signup";
// import Dashboard from "./components/dashboard";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./login";
// import Signup from "./signup";
// import Dashboard from "./dashboard";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <div className="app">
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./login";
// import Signup from "./signup";
// import Dashboard from "./dashboard";     
// import Editor from "./components/editor";
// import "./App.css";
// import FrontPage from "./components/frontPage";


// function App() {
//   return (
//     <Router>
//       <div className="app">
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/editor/:id" element={<Editor />} /> 
//           <Route path="/editor/new" element={<Editor />} /> 
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Dashboard from "./dashboard";     
import Editor from "./components/editor";
import FrontPage from "./components/frontPage"; // now we will use it
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* FrontPage as the landing page */}
          <Route path="/" element={<FrontPage />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard & Editor */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor/:id" element={<Editor />} /> 
          <Route path="/editor/new" element={<Editor />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
