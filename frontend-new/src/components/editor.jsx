// // // import React, { useState, useEffect, useRef } from "react";
// // // import ReactQuill from "react-quill";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import { io } from "socket.io-client";
// // // import "react-quill/dist/quill.snow.css";
// // // import "./editor.css";

// // // const socket = io("http://localhost:5000");

// // // export default function Editor() {
// // //   const [title, setTitle] = useState("Untitled Document");
// // //   const [content, setContent] = useState("");
// // //   const [cursors, setCursors] = useState({});
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const quillRef = useRef();

// // //   const userColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

// // //   // Load document
// // //   useEffect(() => {
// // //     fetch(`http://localhost:5000/api/documents/${id}`)
// // //       .then((res) => res.json())
// // //       .then((data) => {
// // //         setTitle(data.title || "Untitled Document");
// // //         setContent(data.content || "");
// // //       })
// // //       .catch((err) => console.error("Error loading document:", err));

// // //     // Join document room
// // //     socket.emit("join-document", id);

// // //     // Receive changes from others
// // //     socket.on("receive-changes", (delta) => {
// // //       const editor = quillRef.current.getEditor();
// // //       editor.updateContents(delta);
// // //     });

// // //     // Receive cursor updates
// // //     socket.on("update-cursor", ({ id: userId, cursor, color }) => {
// // //       setCursors((prev) => ({ ...prev, [userId]: { cursor, color } }));
// // //     });

// // //     return () => {
// // //       socket.off("receive-changes");
// // //       socket.off("update-cursor");
// // //     };
// // //   }, [id]);

// // //   // Handle editor changes
// // //   const handleChange = (value, delta, source, editor) => {
// // //     setContent(value);

// // //     if (source === "user") {
// // //       socket.emit("send-changes", { docId: id, delta });
// // //       const cursorPos = editor.getSelection()?.index || 0;
// // //       socket.emit("cursor-move", { docId: id, cursor: cursorPos, color: userColor });
// // //     }
// // //   };

// // //   // Save document
// // //   const handleSave = async () => {
// // //     try {
// // //       const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
// // //         method: "PUT",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ title, content }),
// // //       });
// // //       const data = await res.json();
// // //       alert("✅ Document saved successfully!");
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("❌ Error saving document");
// // //     }
// // //   };

// // //   // Delete document
// // //   const handleDelete = async () => {
// // //     if (window.confirm("Are you sure you want to delete this document?")) {
// // //       try {
// // //         const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
// // //           method: "DELETE",
// // //         });
// // //         if (!res.ok) throw new Error("Failed to delete document");
// // //         navigate("/dashboard");
// // //       } catch (err) {
// // //         console.error(err);
// // //         alert("❌ Error deleting document");
// // //       }
// // //     }
// // //   };

// // //   const handleBack = () => navigate(-1);
// // //   const handleSettings = () => alert("⚙️ Settings clicked");

// // //   const modules = {
// // //     toolbar: [
// // //       [{ header: [1, 2, 3, false] }],
// // //       ["bold", "italic", "underline", "strike"],
// // //       [{ list: "ordered" }, { list: "bullet" }],
// // //       ["blockquote", "code-block"],
// // //       ["link", "image"],
// // //       [{ align: [] }],
// // //       [{ color: [] }, { background: [] }],
// // //       ["clean"],
// // //     ],
// // //   };

// // //   return (
// // //     <div className="page-wrapper">
// // //       {/* Sidebar */}
// // //       <div className="sidebar">
// // //         <button onClick={handleBack}>← Back</button>
// // //         <button onClick={handleSave}>💾 Save</button>
// // //         <button onClick={handleSettings}>⚙️ Settings</button>
// // //         <button onClick={handleDelete}>🗑️ Delete</button>
// // //       </div>

// // //       {/* Editor Area */}
// // //       <div className="editor-wrapper">
// // //         <div className="editor-box">
// // //           <input
// // //             type="text"
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //             className="doc-title"
// // //             placeholder="Enter document title..."
// // //           />

// // //           <ReactQuill
// // //             ref={quillRef}
// // //             value={content}
// // //             onChange={handleChange}
// // //             modules={modules}
// // //             theme="snow"
// // //             className="custom-quill"
// // //           />

// // //           {/* Live cursors */}
// // //           {Object.values(cursors).map((c, i) => (
// // //             <div
// // //               key={i}
// // //               className="cursor-indicator"
// // //               style={{
// // //                 left: c.cursor * 8, // rough estimate, can be improved
// // //                 borderLeft: `2px solid ${c.color}`,
// // //                 position: "absolute",
// // //                 top: 0,
// // //                 height: "100%",
// // //               }}
// // //             ></div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // import React, { useState, useEffect, useRef } from "react";
// // // import ReactQuill from "react-quill";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import { io } from "socket.io-client";
// // // import "react-quill/dist/quill.snow.css";
// // // import "./editor.css";

// // // const socket = io("http://localhost:5000");

// // // export default function Editor() {
// // //   const [title, setTitle] = useState("Untitled Document");
// // //   const [content, setContent] = useState("");
// // //   const [cursors, setCursors] = useState({});
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const quillRef = useRef();

// // //   const userColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

// // //   // Load document with password check
// // //   useEffect(() => {
// // //     const fetchDocument = async () => {
// // //       try {
// // //         let password = "";
// // //         let success = false;
// // //         while (!success) {
// // //           const res = await fetch(
// // //             `http://localhost:5000/api/documents/${id}${password ? "?password=" + password : ""}`
// // //           );
// // //           if (res.status === 401) {
// // //             password = prompt("Enter document password:");
// // //             if (!password) return alert("Password required");
// // //           } else if (!res.ok) {
// // //             return alert("Error loading document");
// // //           } else {
// // //             const data = await res.json();
// // //             setTitle(data.title || "Untitled Document");
// // //             setContent(data.content || "");
// // //             success = true;
// // //           }
// // //         }
// // //       } catch (err) {
// // //         console.error("Error loading document:", err);
// // //         alert("Error loading document");
// // //       }
// // //     };
// // //     fetchDocument();

// // //     // Join document room
// // //     socket.emit("join-document", id);

// // //     // Receive changes from others
// // //     socket.on("receive-changes", (delta) => {
// // //       const editor = quillRef.current.getEditor();
// // //       editor.updateContents(delta);
// // //     });

// // //     // Receive cursor updates
// // //     socket.on("update-cursor", ({ id: userId, cursor, color }) => {
// // //       setCursors((prev) => ({ ...prev, [userId]: { cursor, color } }));
// // //     });

// // //     return () => {
// // //       socket.off("receive-changes");
// // //       socket.off("update-cursor");
// // //     };
// // //   }, [id]);

// // //   // Handle editor changes
// // //   const handleChange = (value, delta, source, editor) => {
// // //     setContent(value);

// // //     if (source === "user") {
// // //       socket.emit("send-changes", { docId: id, delta });
// // //       const cursorPos = editor.getSelection()?.index || 0;
// // //       socket.emit("cursor-move", { docId: id, cursor: cursorPos, color: userColor });
// // //     }
// // //   };

// // //   // Save document
// // //   const handleSave = async () => {
// // //     try {
// // //       const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
// // //         method: "PUT",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ title, content }),
// // //       });
// // //       const data = await res.json();
// // //       alert("✅ Document saved successfully!");
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("❌ Error saving document");
// // //     }
// // //   };

// // //   // Delete document
// // //   const handleDelete = async () => {
// // //     if (window.confirm("Are you sure you want to delete this document?")) {
// // //       try {
// // //         const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
// // //           method: "DELETE",
// // //         });
// // //         if (!res.ok) throw new Error("Failed to delete document");
// // //         navigate("/dashboard");
// // //       } catch (err) {
// // //         console.error(err);
// // //         alert("❌ Error deleting document");
// // //       }
// // //     }
// // //   };

// // //   const handleBack = () => navigate(-1);
// // //   const handleSettings = () => alert("⚙️ Settings clicked");

// // //   const modules = {
// // //     toolbar: [
// // //       [{ header: [1, 2, 3, false] }],
// // //       ["bold", "italic", "underline", "strike"],
// // //       [{ list: "ordered" }, { list: "bullet" }],
// // //       ["blockquote", "code-block"],
// // //       ["link", "image"],
// // //       [{ align: [] }],
// // //       [{ color: [] }, { background: [] }],
// // //       ["clean"],
// // //     ],
// // //   };

// // //   return (
// // //     <div className="page-wrapper">
// // //       {/* Sidebar */}
// // //       <div className="sidebar">
// // //         <button onClick={handleBack}>← Back</button>
// // //         <button onClick={handleSave}>💾 Save</button>
// // //         <button onClick={handleSettings}>⚙️ Settings</button>
// // //         <button onClick={handleDelete}>🗑️ Delete</button>
// // //       </div>

// // //       {/* Editor Area */}
// // //       <div className="editor-wrapper">
// // //         <div className="editor-box">
// // //           <input
// // //             type="text"
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //             className="doc-title"
// // //             placeholder="Enter document title..."
// // //           />

// // //           <ReactQuill
// // //             ref={quillRef}
// // //             value={content}
// // //             onChange={handleChange}
// // //             modules={modules}
// // //             theme="snow"
// // //             className="custom-quill"
// // //           />

// // //           {/* Live cursors */}
// // //           {Object.values(cursors).map((c, i) => (
// // //             <div
// // //               key={i}
// // //               className="cursor-indicator"
// // //               style={{
// // //                 left: c.cursor * 8,
// // //                 borderLeft: `2px solid ${c.color}`,
// // //                 position: "absolute",
// // //                 top: 0,
// // //                 height: "100%",
// // //               }}
// // //             ></div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // import React, { useState, useEffect, useRef } from "react";
// // // import ReactQuill from "react-quill";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import { io } from "socket.io-client";
// // // import "react-quill/dist/quill.snow.css";
// // // import "./editor.css";

// // // const socket = io("http://localhost:5000");

// // // export default function Editor() {
// // //   const [title, setTitle] = useState("Untitled Document");
// // //   const [content, setContent] = useState("");
// // //   const [cursors, setCursors] = useState({});
// // //   const [theme, setTheme] = useState("light"); // Default theme
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const quillRef = useRef();

// // //   const userColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

// // //   // Apply theme
// // //   useEffect(() => {
// // //     document.documentElement.setAttribute("data-theme", theme);
// // //   }, [theme]);

// // //   const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

// // //   // Fetch document, join room, handle socket events (same as before)
// // //   useEffect(() => {
// // //     const fetchDocument = async () => {
// // //       try {
// // //         let password = "";
// // //         let success = false;
// // //         while (!success) {
// // //           const res = await fetch(
// // //             `http://localhost:5000/api/documents/${id}${password ? "?password=" + password : ""}`
// // //           );
// // //           if (res.status === 401) {
// // //             password = prompt("Enter document password:");
// // //             if (!password) return alert("Password required");
// // //           } else if (!res.ok) {
// // //             return alert("Error loading document");
// // //           } else {
// // //             const data = await res.json();
// // //             setTitle(data.title || "Untitled Document");
// // //             setContent(data.content || "");
// // //             success = true;
// // //           }
// // //         }
// // //       } catch (err) {
// // //         console.error("Error loading document:", err);
// // //         alert("Error loading document");
// // //       }
// // //     };
// // //     fetchDocument();

// // //     socket.emit("join-document", id);

// // //     socket.on("receive-changes", (delta) => {
// // //       const editor = quillRef.current.getEditor();
// // //       editor.updateContents(delta);
// // //     });

// // //     socket.on("update-cursor", ({ id: userId, cursor, color }) => {
// // //       setCursors((prev) => ({ ...prev, [userId]: { cursor, color } }));
// // //     });

// // //     return () => {
// // //       socket.off("receive-changes");
// // //       socket.off("update-cursor");
// // //     };
// // //   }, [id]);

// // //   // Editor change handler
// // //   const handleChange = (value, delta, source, editor) => {
// // //     setContent(value);
// // //     if (source === "user") {
// // //       socket.emit("send-changes", { docId: id, delta });
// // //       const cursorPos = editor.getSelection()?.index || 0;
// // //       socket.emit("cursor-move", { docId: id, cursor: cursorPos, color: userColor });
// // //     }
// // //   };

// // //   // Save / Delete / Back / Settings (same as before)
// // //   const handleSave = async () => { /* ... */ };
// // //   const handleDelete = async () => { /* ... */ };
// // //   const handleBack = () => navigate(-1);
// // //   const handleSettings = () => alert("⚙️ Settings clicked");

// // //   const modules = {
// // //     toolbar: [
// // //       [{ header: [1, 2, 3, false] }],
// // //       ["bold", "italic", "underline", "strike"],
// // //       [{ list: "ordered" }, { list: "bullet" }],
// // //       ["blockquote", "code-block"],
// // //       ["link", "image"],
// // //       [{ align: [] }],
// // //       [{ color: [] }, { background: [] }],
// // //       ["clean"],
// // //     ],
// // //   };

// // //   return (
// // //     <div className="page-wrapper">
// // //       {/* Sidebar */}
// // //       <div className="sidebar">
// // //         <button onClick={handleBack}>← Back</button>
// // //         <button onClick={handleSave}>💾 Save</button>
// // //         <button onClick={handleSettings}>⚙️ Settings</button>
// // //         <button onClick={handleDelete}>🗑️ Delete</button>
// // //         {/* Theme Toggle */}
// // //         <button onClick={toggleTheme}>
// // //           {theme === "light" ? "Dark Mode" : "Light Mode"}
// // //         </button>
// // //       </div>

// // //       {/* Editor */}
// // //       <div className="editor-wrapper">
// // //         <div className="editor-box">
// // //           <input
// // //             type="text"
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //             className="doc-title"
// // //             placeholder="Enter document title..."
// // //           />
// // //           <ReactQuill
// // //             ref={quillRef}
// // //             value={content}
// // //             onChange={handleChange}
// // //             modules={modules}
// // //             theme="snow"
// // //             className="custom-quill"
// // //           />
// // //           {Object.values(cursors).map((c, i) => (
// // //             <div
// // //               key={i}
// // //               className="cursor-indicator"
// // //               style={{
// // //                 left: c.cursor * 8,
// // //                 borderLeft: `2px solid ${c.color}`,
// // //                 position: "absolute",
// // //                 top: 0,
// // //                 height: "100%",
// // //               }}
// // //             ></div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // import React, { useState, useEffect, useRef } from "react";
// // // import ReactQuill from "react-quill";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import { io } from "socket.io-client";
// // // import "react-quill/dist/quill.snow.css";
// // // import "./editor.css";

// // // const socket = io("http://localhost:5000");

// // // export default function Editor() {
// // //   const [title, setTitle] = useState("Untitled Document");
// // //   const [content, setContent] = useState("");
// // //   const [cursors, setCursors] = useState({});
// // //   const [theme, setTheme] = useState("light"); // Default theme
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const quillRef = useRef();

// // //   const userColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

// // //   // Apply theme
// // //   useEffect(() => {
// // //     document.documentElement.setAttribute("data-theme", theme);
// // //   }, [theme]);

// // //   const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

// // //   // Fetch document, join room, handle socket events
// // //   useEffect(() => {
// // //     const fetchDocument = async () => {
// // //       try {
// // //         let password = "";
// // //         let success = false;
// // //         while (!success) {
// // //           const res = await fetch(
// // //             `http://localhost:5000/api/documents/${id}${password ? "?password=" + password : ""}`,
// // //             {
// // //               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// // //             }
// // //           );

// // //           if (res.status === 401) {
// // //             password = prompt("Enter document password:");
// // //             if (!password) return alert("Password required");
// // //           } else if (!res.ok) {
// // //             return alert("Error loading document");
// // //           } else {
// // //             const data = await res.json();
// // //             setTitle(data.title || "Untitled Document");
// // //             setContent(data.content || "");
// // //             success = true;
// // //           }
// // //         }
// // //       } catch (err) {
// // //         console.error("Error loading document:", err);
// // //         alert("Error loading document");
// // //       }
// // //     };
// // //     fetchDocument();

// // //     // Join document room
// // //     socket.emit("join-document", id);

// // //     socket.on("receive-changes", (delta) => {
// // //       const editor = quillRef.current.getEditor();
// // //       editor.updateContents(delta);
// // //     });

// // //     socket.on("update-cursor", ({ id: userId, cursor, color }) => {
// // //       setCursors((prev) => ({ ...prev, [userId]: { cursor, color } }));
// // //     });

// // //     return () => {
// // //       socket.off("receive-changes");
// // //       socket.off("update-cursor");
// // //     };
// // //   }, [id]);

// // //   // Handle editor changes
// // //   const handleChange = (value, delta, source, editor) => {
// // //     setContent(value);
// // //     if (source === "user") {
// // //       socket.emit("send-changes", { docId: id, delta });
// // //       const cursorPos = editor.getSelection()?.index || 0;
// // //       socket.emit("cursor-move", { docId: id, cursor: cursorPos, color: userColor });
// // //     }
// // //   };

// // //   // Save document
// // //   const handleSave = async () => {
// // //     try {
// // //       const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
// // //         method: "PUT",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           Authorization: `Bearer ${localStorage.getItem("token")}`,
// // //         },
// // //         body: JSON.stringify({ title, content }),
// // //       });
// // //       if (!res.ok) {
// // //         const err = await res.json();
// // //         throw new Error(err.error || "Failed to save document");
// // //       }
// // //       alert("✅ Document saved successfully!");
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("❌ Error saving document");
// // //     }
// // //   };

// // //   // Delete document
// // //   const handleDelete = async () => {
// // //     if (!window.confirm("Are you sure you want to delete this document?")) return;

// // //     try {
// // //       const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
// // //         method: "DELETE",
// // //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// // //       });
// // //       if (!res.ok) {
// // //         const err = await res.json();
// // //         throw new Error(err.error || "Failed to delete document");
// // //       }
// // //       alert("🗑️ Document deleted successfully!");
// // //       navigate("/dashboard");
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("❌ Error deleting document");
// // //     }
// // //   };

// // //   const handleBack = () => navigate(-1);
// // //   const handleSettings = () => alert("⚙️ Settings clicked");

// // //   const modules = {
// // //     toolbar: [
// // //       [{ header: [1, 2, 3, false] }],
// // //       ["bold", "italic", "underline", "strike"],
// // //       [{ list: "ordered" }, { list: "bullet" }],
// // //       ["blockquote", "code-block"],
// // //       ["link", "image"],
// // //       [{ align: [] }],
// // //       [{ color: [] }, { background: [] }],
// // //       ["clean"],
// // //     ],
// // //   };

// // //   return (
// // //     <div className="page-wrapper">
// // //       {/* Sidebar */}
// // //       <div className="sidebar">
// // //         <button onClick={handleBack}>← Back</button>
// // //         <button onClick={handleSave}>💾 Save</button>
// // //         <button onClick={handleSettings}>⚙️ Settings</button>
// // //         <button onClick={handleDelete}>🗑️ Delete</button>
// // //         <button onClick={toggleTheme}>
// // //           {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
// // //         </button>
// // //       </div>

// // //       {/* Editor */}
// // //       <div className="editor-wrapper">
// // //         <div className="editor-box">
// // //           <input
// // //             type="text"
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //             className="doc-title"
// // //             placeholder="Enter document title..."
// // //           />
// // //           <ReactQuill
// // //             ref={quillRef}
// // //             value={content}
// // //             onChange={handleChange}
// // //             modules={modules}
// // //             theme="snow"
// // //             className="custom-quill"
// // //           />
// // //           {/* Live cursors */}
// // //           {Object.values(cursors).map((c, i) => (
// // //             <div
// // //               key={i}
// // //               className="cursor-indicator"
// // //               style={{
// // //                 left: c.cursor * 8,
// // //                 borderLeft: `2px solid ${c.color}`,
// // //                 position: "absolute",
// // //                 top: 0,
// // //                 height: "100%",
// // //               }}
// // //             />
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useEffect, useRef } from "react";
// // import ReactQuill from "react-quill";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { io } from "socket.io-client";
// // import "react-quill/dist/quill.snow.css";
// // import "./editor.css";

// // const socket = io("http://localhost:5000");

// // export default function Editor() {
// //   const [title, setTitle] = useState("Untitled Document");
// //   const [content, setContent] = useState("");
// //   const [cursors, setCursors] = useState({});
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const quillRef = useRef();

// //   const userColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

// //   // Load document with password check
// //   useEffect(() => {
// //     const fetchDocument = async () => {
// //       try {
// //         let password = "";
// //         let success = false;
// //         while (!success) {
// //           const res = await fetch(
// //             `http://localhost:5000/api/documents/${id}${password ? "?password=" + password : ""}`
// //           );
// //           if (res.status === 401) {
// //             password = prompt("Enter document password:");
// //             if (!password) return alert("Password required");
// //           } else if (!res.ok) {
// //             return alert("Error loading document");
// //           } else {
// //             const data = await res.json();
// //             setTitle(data.title || "Untitled Document");
// //             setContent(data.content || "");
// //             success = true;
// //           }
// //         }
// //       } catch (err) {
// //         console.error("Error loading document:", err);
// //         alert("Error loading document");
// //       }
// //     };
// //     fetchDocument();

// //     // Join document room
// //     socket.emit("join-document", id);

// //     // Receive changes from others
// //     socket.on("receive-changes", (delta) => {
// //       const editor = quillRef.current.getEditor();
// //       editor.updateContents(delta);
// //     });

// //     // Receive cursor updates
// //     socket.on("update-cursor", ({ id: userId, cursor, color }) => {
// //       setCursors((prev) => ({ ...prev, [userId]: { cursor, color } }));
// //     });

// //     return () => {
// //       socket.off("receive-changes");
// //       socket.off("update-cursor");
// //     };
// //   }, [id]);

// //   // Handle editor changes
// //   const handleChange = (value, delta, source, editor) => {
// //     setContent(value);

// //     if (source === "user") {
// //       socket.emit("send-changes", { docId: id, delta });
// //       const cursorPos = editor.getSelection()?.index || 0;
// //       socket.emit("cursor-move", { docId: id, cursor: cursorPos, color: userColor });
// //     }
// //   };

// //   // Save document
// //   const handleSave = async () => {
// //     try {
// //       const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ title, content }),
// //       });
// //       const data = await res.json();
// //       alert("✅ Document saved successfully!");
// //     } catch (err) {
// //       console.error(err);
// //       alert("❌ Error saving document");
// //     }
// //   };

// //   // Delete document
// //   const handleDelete = async () => {
// //     if (window.confirm("Are you sure you want to delete this document?")) {
// //       try {
// //         const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
// //           method: "DELETE",
// //         });
// //         if (!res.ok) throw new Error("Failed to delete document");
// //         navigate("/dashboard");
// //       } catch (err) {
// //         console.error(err);
// //         alert("❌ Error deleting document");
// //       }
// //     }
// //   };

// //   const handleBack = () => navigate(-1);
// //   const handleSettings = () => alert("⚙️ Settings clicked");

// //   const modules = {
// //     toolbar: [
// //       [{ header: [1, 2, 3, false] }],
// //       ["bold", "italic", "underline", "strike"],
// //       [{ list: "ordered" }, { list: "bullet" }],
// //       ["blockquote", "code-block"],
// //       ["link", "image"],
// //       [{ align: [] }],
// //       [{ color: [] }, { background: [] }],
// //       ["clean"],
// //     ],
// //   };

// //   return (
// //     <div className="page-wrapper">
// //       {/* Sidebar */}
// //       <div className="sidebar">
// //         <button onClick={handleBack}>← Back</button>
// //         <button onClick={handleSave}>💾 Save</button>
// //         <button onClick={handleSettings}>⚙️ Settings</button>
// //         <button onClick={handleDelete}>🗑️ Delete</button>
// //       </div>

// //       {/* Editor Area */}
// //       <div className="editor-wrapper">
// //         <div className="editor-box">
// //           <input
// //             type="text"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             className="doc-title"
// //             placeholder="Enter document title..."
// //           />

// //           <ReactQuill
// //             ref={quillRef}
// //             value={content}
// //             onChange={handleChange}
// //             modules={modules}
// //             theme="snow"
// //             className="custom-quill"
// //           />

// //           {/* Live cursors */}
// //           {Object.values(cursors).map((c, i) => (
// //             <div
// //               key={i}
// //               className="cursor-indicator"
// //               style={{
// //                 left: c.cursor * 8,
// //                 borderLeft: `2px solid ${c.color}`,
// //                 position: "absolute",
// //                 top: 0,
// //                 height: "100%",
// //               }}
// //             ></div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect, useRef } from "react";
// import ReactQuill from "react-quill";
// import { useNavigate, useParams } from "react-router-dom";
// import { io } from "socket.io-client";
// import "react-quill/dist/quill.snow.css";
// import "./editor.css";

// const socket = io("http://localhost:5000");

// export default function Editor() {
//   const [title, setTitle] = useState("Untitled Document");
//   const [content, setContent] = useState("");
//   const [cursors, setCursors] = useState({});
//   const [theme, setTheme] = useState("light"); // Default theme
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const quillRef = useRef();

//   const userColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

//   // Apply theme
//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//   }, [theme]);

//   const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

//   // Fetch document, join room, handle socket events
//   useEffect(() => {
//     const fetchDocument = async () => {
//       try {
//         let password = "";
//         let success = false;
//         while (!success) {
//           const res = await fetch(
//             `http://localhost:5000/api/documents/${id}${password ? "?password=" + password : ""}`
//           );
//           if (res.status === 401) {
//             password = prompt("Enter document password:");
//             if (!password) return alert("Password required");
//           } else if (!res.ok) {
//             return alert("Error loading document");
//           } else {
//             const data = await res.json();
//             setTitle(data.title || "Untitled Document");
//             setContent(data.content || "");
//             success = true;
//           }
//         }
//       } catch (err) {
//         console.error("Error loading document:", err);
//         alert("Error loading document");
//       }
//     };
//     fetchDocument();

//     socket.emit("join-document", id);

//     socket.on("receive-changes", (delta) => {
//       const editor = quillRef.current.getEditor();
//       editor.updateContents(delta);
//     });

//     socket.on("update-cursor", ({ id: userId, cursor, color }) => {
//       setCursors((prev) => ({ ...prev, [userId]: { cursor, color } }));
//     });

//     return () => {
//       socket.off("receive-changes");
//       socket.off("update-cursor");
//     };
//   }, [id]);

//   // Editor change handler
//   const handleChange = (value, delta, source, editor) => {
//     setContent(value);
//     if (source === "user") {
//       socket.emit("send-changes", { docId: id, delta });
//       const cursorPos = editor.getSelection()?.index || 0;
//       socket.emit("cursor-move", { docId: id, cursor: cursorPos, color: userColor });
//     }
//   };

//   // Save document
//   const handleSave = async () => {
//     try {
//       await fetch(`http://localhost:5000/api/documents/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title, content }),
//       });
//       alert("✅ Document saved successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error saving document");
//     }
//   };

//   // Delete document
//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this document?")) {
//       try {
//         const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
//           method: "DELETE",
//         });
//         if (!res.ok) throw new Error("Failed to delete document");
//         navigate("/dashboard");
//       } catch (err) {
//         console.error(err);
//         alert("❌ Error deleting document");
//       }
//     }
//   };

//   const handleBack = () => navigate(-1);
//   const handleSettings = () => alert("⚙️ Settings clicked");

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["blockquote", "code-block"],
//       ["link", "image"],
//       [{ align: [] }],
//       [{ color: [] }, { background: [] }],
//       ["clean"],
//     ],
//   };

//   return (
//     <div className="page-wrapper">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <button onClick={handleBack}>← Back</button>
//         <button onClick={handleSave}>💾 Save</button>
//         <button onClick={handleSettings}>⚙️ Settings</button>
//         <button onClick={handleDelete}>🗑️ Delete</button>
//         {/* Theme Toggle */}
//         <button onClick={toggleTheme}>
//           {theme === "light" ? "Dark Mode" : "Light Mode"}
//         </button>
//       </div>

//       {/* Editor */}
//       <div className="editor-wrapper">
//         <div className="editor-box">
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="doc-title"
//             placeholder="Enter document title..."
//           />
//           <ReactQuill
//             ref={quillRef}
//             value={content}
//             onChange={handleChange}
//             modules={modules}
//             theme="snow"
//             className="custom-quill"
//           />
//           {Object.values(cursors).map((c, i) => (
//             <div
//               key={i}
//               className="cursor-indicator"
//               style={{
//                 left: c.cursor * 8,
//                 borderLeft: `2px solid ${c.color}`,
//                 position: "absolute",
//                 top: 0,
//                 height: "100%",
//               }}
//             ></div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from "react";
// import ReactQuill from "react-quill";
// import { useNavigate, useParams } from "react-router-dom";
// import { io } from "socket.io-client";
// import "react-quill/dist/quill.snow.css";
// import "./editor.css";

// const socket = io("http://localhost:5000");

// export default function Editor() {
//   const [title, setTitle] = useState("Untitled Document");
//   const [content, setContent] = useState("");
//   const [cursors, setCursors] = useState({});
//   const [theme, setTheme] = useState("light"); // default theme
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const quillRef = useRef();

//   const userColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

//   // Apply theme
//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//   }, [theme]);

//   const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

//   // Fetch document and handle socket events
//   useEffect(() => {
//     const fetchDocument = async () => {
//       try {
//         let password = "";
//         let success = false;
//         while (!success) {
//           const res = await fetch(
//             `http://localhost:5000/api/documents/${id}${password ? "?password=" + password : ""}`
//           );
//           if (res.status === 401) {
//             password = prompt("Enter document password:");
//             if (!password) return alert("Password required");
//           } else if (!res.ok) {
//             return alert("Error loading document");
//           } else {
//             const data = await res.json();
//             setTitle(data.title || "Untitled Document");
//             setContent(data.content || "");
//             success = true;
//           }
//         }
//       } catch (err) {
//         console.error("Error loading document:", err);
//         alert("Error loading document");
//       }
//     };
//     fetchDocument();

//     socket.emit("join-document", id);

//     socket.on("receive-changes", (delta) => {
//       const editor = quillRef.current.getEditor();
//       editor.updateContents(delta);
//     });

//     socket.on("update-cursor", ({ id: userId, cursor, color }) => {
//       setCursors((prev) => ({ ...prev, [userId]: { cursor, color } }));
//     });

//     return () => {
//       socket.off("receive-changes");
//       socket.off("update-cursor");
//     };
//   }, [id]);

//   // Handle editor changes
//   const handleChange = (value, delta, source, editor) => {
//     setContent(value);
//     if (source === "user") {
//       socket.emit("send-changes", { docId: id, delta });
//       const cursorPos = editor.getSelection()?.index || 0;
//       socket.emit("cursor-move", { docId: id, cursor: cursorPos, color: userColor });
//     }
//   };

//   // Save document
//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
//         method: "PUT",
//         headers: { 
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//         body: JSON.stringify({ title, content }),
//       });

//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.error || "Failed to save document");
//       }

//       alert("💾 Document saved successfully!");
//     } catch (err) {
//       console.error("Save error:", err);
//       alert("❌ Error saving document: " + err.message);
//     }
//   };

//   // Delete document
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this document?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       });

//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.error || "Failed to delete document");
//       }

//       alert("🗑️ Document deleted successfully!");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("❌ Error deleting document: " + err.message);
//     }
//   };

//   const handleBack = () => navigate(-1);
//   const handleSettings = () => alert("⚙️ Settings clicked");

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["blockquote", "code-block"],
//       ["link", "image"],
//       [{ align: [] }],
//       [{ color: [] }, { background: [] }],
//       ["clean"],
//     ],
//   };

//   return (
//     <div className="page-wrapper">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <button onClick={handleBack}>← Back</button>
//         <button onClick={handleSave}>💾 Save</button>
//         <button onClick={handleSettings}>⚙️ Settings</button>
//         <button onClick={handleDelete}>🗑️ Delete</button>
//         <button onClick={toggleTheme}>
//           {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
//         </button>
//       </div>

//       {/* Editor */}
//       <div className="editor-wrapper">
//         <div className="editor-box">
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="doc-title"
//             placeholder="Enter document title..."
//           />
//           <ReactQuill
//             ref={quillRef}
//             value={content}
//             onChange={handleChange}
//             modules={modules}
//             theme="snow"
//             className="custom-quill"
//           />
//           {Object.values(cursors).map((c, i) => (
//             <div
//               key={i}
//               className="cursor-indicator"
//               style={{
//                 left: c.cursor * 8,
//                 borderLeft: `2px solid ${c.color}`,
//                 position: "absolute",
//                 top: 0,
//                 height: "100%",
//               }}
//             ></div>
//           ))}
//         </div>

//         {/* Right section can be kept empty or used for additional info */}
//         <div className="right"></div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "react-quill/dist/quill.snow.css";
import "./editor.css";

const socket = io("http://localhost:5000");

export default function Editor() {
  const [title, setTitle] = useState("Untitled Document");
  const [content, setContent] = useState("");
  const [cursors, setCursors] = useState({});
  const [theme, setTheme] = useState("light");
  const { id } = useParams();
  const navigate = useNavigate();
  const quillRef = useRef();

  const userColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  // Apply dark/light theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  // Fetch document & socket events
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        let password = "";
        let success = false;
        while (!success) {
          const res = await fetch(
            `http://localhost:5000/api/documents/${id}${password ? "?password=" + password : ""}`,
            { headers: { "Content-Type": "application/json" } }
          );

          if (res.status === 401) {
            password = prompt("Enter document password:");
            if (!password) return alert("Password required");
          } else if (!res.ok) {
            return alert("Error loading document");
          } else {
            const data = await res.json();
            setTitle(data.title || "Untitled Document");
            setContent(data.content || "");
            success = true;
          }
        }
      } catch (err) {
        console.error("Error loading document:", err);
        alert("Error loading document");
      }
    };

    fetchDocument();
    socket.emit("join-document", id);

    socket.on("receive-changes", delta => {
      const editor = quillRef.current.getEditor();
      editor.updateContents(delta);
    });

    socket.on("update-cursor", ({ id: userId, cursor, color }) => {
      setCursors(prev => ({ ...prev, [userId]: { cursor, color } }));
    });

    return () => {
      socket.off("receive-changes");
      socket.off("update-cursor");
    };
  }, [id]);

  // Handle content changes
  const handleChange = (value, delta, source, editor) => {
    setContent(value);
    if (source === "user") {
      socket.emit("send-changes", { docId: id, delta });
      const cursorPos = editor.getSelection()?.index || 0;
      socket.emit("cursor-move", { docId: id, cursor: cursorPos, color: userColor });
    }
  };

  // Save document
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save document");
      }

      alert("💾 Document saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Error saving document: " + err.message);
    }
  };

  // Delete document
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete document");
      }

      alert("🗑️ Document deleted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Error deleting document: " + err.message);
    }
  };

  const handleBack = () => navigate(-1);
  const handleSettings = () => alert("⚙️ Settings clicked");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  return (
    <div className="page-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={handleBack}>← Back</button>
        <button onClick={handleSave}>💾 Save</button>
        <button onClick={handleSettings}>⚙️ Settings</button>
        <button onClick={handleDelete}>🗑️ Delete</button>
        <button onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      {/* Editor */}
      <div className="editor-wrapper">
        <div className="editor-box">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="doc-title"
            placeholder="Enter document title..."
          />
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={handleChange}
            modules={modules}
            theme="snow"
            className="custom-quill"
          />
          {Object.values(cursors).map((c, i) => (
            <div
              key={i}
              className="cursor-indicator"
              style={{
                left: c.cursor * 8,
                borderLeft: `2px solid ${c.color}`,
                position: "absolute",
                top: 0,
                height: "100%",
              }}
            ></div>
          ))}
        </div>

        {/* Right empty section */}
        <div className="right"></div>
      </div>
    </div>
  );
}
