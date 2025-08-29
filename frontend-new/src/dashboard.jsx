// import React, { useState, useEffect } from "react";
// import "./App.css";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const navigate = useNavigate();
//   const [documents, setDocuments] = useState([]);

//   // Fetch documents from backend
//   useEffect(() => {
//     fetch("http://localhost:5000/api/documents")
//       .then((res) => res.json())
//       .then((data) => setDocuments(data))
//       .catch((err) => console.error("Error fetching documents:", err));
//   }, []);

//   const handleNewDoc = async () => {
//   try {
//     const res = await fetch("http://localhost:5000/api/documents", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: "Untitled Document", content: "" }),
//     });

//     const newDoc = await res.json();
//     if (res.ok) {
//       navigate(`/editor/${newDoc._id}`); // 👈 ab specific doc ke editor pe jaayega
//     } else {
//       alert(newDoc.error || "Failed to create document");
//     }
//   } catch (err) {
//     console.error("Error creating document:", err);
//     alert("Server error");
//   }
// };
//   // Open existing document
//   const handleOpenDoc = (id) => {
//     navigate(`/editor/${id}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className="container">
//       {/* Left Section */}
//       <div className="left">
//         <h2>📄 Dashboard</h2>
//         <p>Welcome to your Cloud Doc Editor 🚀</p>

//         <button className="btn new-doc" onClick={handleNewDoc}>
//           + New Document
//         </button>

//         <h3>Your Documents</h3>
//         {documents.length === 0 ? (
//           <p>No documents yet. Create one!</p>
//         ) : (
//           <ul className="doc-list">
//             {documents.map((doc) => (
//               <li
//                 key={doc._id}
//                 className="doc-item"
//                 onClick={() => handleOpenDoc(doc._id)}
//               >
//                 {doc.title || "Untitled Document"}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Right Section */}
//       <div className="right">
//         <button className="btn logout" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


// import React, { useState, useEffect } from "react";
// import "./App.css";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const navigate = useNavigate();
//   const [documents, setDocuments] = useState([]);

//   // Fetch documents from backend (only owned or shared)
//   useEffect(() => {
//     const token = localStorage.getItem("token"); // optional if using JWT
//     fetch("http://localhost:5000/api/documents", {
//       headers: { Authorization: token ? `Bearer ${token}` : "" },
//     })
//       .then((res) => res.json())
//       .then((data) => setDocuments(data))
//       .catch((err) => console.error("Error fetching documents:", err));
//   }, []);

//   const handleNewDoc = async () => {
//     try {
//       const title = prompt("Enter document title:", "Untitled Document");
//       if (!title) return;
//       const password = prompt("Optional: Set a password/PIN for this document");
//       const token = localStorage.getItem("token"); // optional

//       const res = await fetch("http://localhost:5000/api/documents", {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//         body: JSON.stringify({ title, content: "", password }),
//       });

//       const newDoc = await res.json();
//       if (res.ok) navigate(`/editor/${newDoc._id}`);
//       else alert(newDoc.error || "Failed to create document");
//     } catch (err) {
//       console.error("Error creating document:", err);
//       alert("Server error");
//     }
//   };

//   const handleOpenDoc = async (doc) => {
//     // If document has password, prompt user
//     if (doc.passwordProtected) {
//       let entered = prompt("Enter document password/PIN:");
//       if (!entered) return alert("Password required");
//       navigate(`/editor/${doc._id}?password=${encodeURIComponent(entered)}`);
//     } else {
//       navigate(`/editor/${doc._id}`);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className="container">
//       <div className="left">
//         <h2>📄 Dashboard</h2>
//         <p>Welcome to your Cloud Doc Editor 🚀</p>

//         <button className="btn new-doc" onClick={handleNewDoc}>
//           + New Document
//         </button>

//         <h3>Your Documents</h3>
//         {documents.length === 0 ? (
//           <p>No documents yet. Create one!</p>
//         ) : (
//           <ul className="doc-list">
//             {documents.map((doc) => (
//               <li
//                 key={doc._id}
//                 className="doc-item"
//                 onClick={() => handleOpenDoc(doc)}
//               >
//                 {doc.title || "Untitled Document"}{" "}
//                 {doc.password ? "🔒" : ""}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div className="right">
//         <button className="btn logout" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

// import React, { useState, useEffect } from "react";
// import "./App.css";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const navigate = useNavigate();
//   const [documents, setDocuments] = useState([]);

//   // Fetch documents from backend (only owned or shared)
//   useEffect(() => {
//     const token = localStorage.getItem("token"); // JWT token
//     fetch("http://localhost:5000/api/documents", {
//       headers: { Authorization: token ? `Bearer ${token}` : "" },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         // Ensure documents is always an array
//         const docs = Array.isArray(data) ? data : data.documents || [];
//         setDocuments(docs);
//       })
//       .catch((err) => console.error("Error fetching documents:", err));
//   }, []);

//   // Create new document
//   const handleNewDoc = async () => {
//     try {
//       const title = prompt("Enter document title:", "Untitled Document");
//       if (!title) return;

//       const password = prompt("Optional: Set a password/PIN for this document");
//       const token = localStorage.getItem("token");

//       const res = await fetch("http://localhost:5000/api/documents", {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//         body: JSON.stringify({ title, content: "", password }),
//       });

//       const newDoc = await res.json();
//       if (res.ok) navigate(`/editor/${newDoc._id}`);
//       else alert(newDoc.error || "Failed to create document");
//     } catch (err) {
//       console.error("Error creating document:", err);
//       alert("Server error");
//     }
//   };

//   // Open existing document
//   const handleOpenDoc = async (doc) => {
//     if (doc.password) {
//       let entered = prompt("Enter document password/PIN:");
//       if (!entered) return alert("Password required");
//       navigate(`/editor/${doc._id}?password=${encodeURIComponent(entered)}`);
//     } else {
//       navigate(`/editor/${doc._id}`);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className="container">
//       {/* Left Section */}
//       <div className="left">
//         <h2>📄 Dashboard</h2>
//         <p>Welcome to your Cloud Doc Editor 🚀</p>

//         <button className="btn new-doc" onClick={handleNewDoc}>
//           + New Document
//         </button>

//         <h3>Your Documents</h3>
//         {Array.isArray(documents) && documents.length > 0 ? (
//           <ul className="doc-list">
//             {documents.map((doc) => (
//               <li
//                 key={doc._id}
//                 className="doc-item"
//                 onClick={() => handleOpenDoc(doc)}
//               >
//                 {doc.title || "Untitled Document"} {doc.password ? "🔒" : ""}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No documents yet. Create one!</p>
//         )}
//       </div>

//       {/* Right Section */}
//       <div className="right">
//         <button className="btn logout" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


// import React, { useState, useEffect } from "react";
// import "./App.css";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const navigate = useNavigate();
//   const [documents, setDocuments] = useState([]);

//   // Fetch documents
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     fetch("http://localhost:5000/api/documents", {
//       headers: { Authorization: token ? `Bearer ${token}` : "" },
//     })
//       .then((res) => res.json())
//       .then((data) => setDocuments(data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleNewDoc = async () => {
//     try {
//       const title = prompt("Enter document title:", "Untitled Document");
//       if (!title) return;
//       const password = prompt("Optional: Set a password/PIN for this document");
//       const token = localStorage.getItem("token");

//       const res = await fetch("http://localhost:5000/api/documents", {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//         body: JSON.stringify({ title, content: "", password }),
//       });

//       const newDoc = await res.json();
//       if (res.ok) navigate(`/editor/${newDoc._id}`);
//       else alert(newDoc.error || "Failed to create document");
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };

//   const handleOpenDoc = async (doc) => {
//     if (doc.passwordProtected) {
//       let entered = prompt("Enter document password/PIN:");
//       if (!entered) return alert("Password required");
//       navigate(`/editor/${doc._id}?password=${encodeURIComponent(entered)}`);
//     } else {
//       navigate(`/editor/${doc._id}`);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className="container">
//       {/* Left Section */}
//       <div className="left">
//         {/* Brand Name */}
//         <div className="brand-name">
//           <h1>SyncScribe</h1>
//         </div>

//         <h2>📄 Dashboard</h2>
//         <p>Welcome to your Cloud Doc Editor 🚀</p>

//         <button className="btn new-doc" onClick={handleNewDoc}>
//           + New Document
//         </button>

//         <h3>Your Documents</h3>
//         {documents.length === 0 ? (
//           <p>No documents yet. Create one!</p>
//         ) : (
//           <ul className="doc-list">
//             {documents.map((doc) => (
//               <li
//                 key={doc._id}
//                 className="doc-item"
//                 onClick={() => handleOpenDoc(doc)}
//               >
//                 {doc.title || "Untitled Document"} {doc.password ? "🔒" : ""}
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Logout Button at Bottom */}
//         <button className="btn logout-bottom" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       {/* Right Section */}
//       <div className="right">
//         {/* Can keep other content or leave blank */}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [userName, setUserName] = useState(""); // 👈 user name state

  // Fetch user info from JWT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserName(payload.name); // 👈 get name from JWT payload
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  // Fetch documents
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/documents", {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    })
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch((err) => console.error(err));
  }, []);

  const handleNewDoc = async () => {
    try {
      const title = prompt("Enter document title:", "Untitled Document");
      if (!title) return;
      const password = prompt("Optional: Set a password/PIN for this document");
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/documents", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ title, content: "", password }),
      });

      const newDoc = await res.json();
      if (res.ok) navigate(`/editor/${newDoc._id}`);
      else alert(newDoc.error || "Failed to create document");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  const handleOpenDoc = async (doc) => {
    if (doc.passwordProtected) {
      let entered = prompt("Enter document password/PIN:");
      if (!entered) return alert("Password required");
      navigate(`/editor/${doc._id}?password=${encodeURIComponent(entered)}`);
    } else {
      navigate(`/editor/${doc._id}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">
      {/* Left Section */}
      <div className="left">
        {/* Brand Name */}
        <div className="brand-name">
          <h1>SyncScribe</h1>
        </div>

        <h2>📄 Dashboard</h2>

        {/* Welcome message with user name */}
        <p>Welcome {userName || ""} to your Cloud Doc Editor 🚀</p>

        <button className="btn new-doc" onClick={handleNewDoc}>
          + New Document
        </button>

        <h3>Your Documents</h3>
        {documents.length === 0 ? (
          <p>No documents yet. Create one!</p>
        ) : (
          <ul className="doc-list">
            {documents.map((doc) => (
              <li
                key={doc._id}
                className="doc-item"
                onClick={() => handleOpenDoc(doc)}
              >
                {doc.title || "Untitled Document"} {doc.password ? "🔒" : ""}
              </li>
            ))}
          </ul>
        )}

        {/* Logout Button at Bottom */}
        <button className="btn logout-bottom" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Right Section */}
      <div className="right"></div>
    </div>
  );
}

export default Dashboard;

