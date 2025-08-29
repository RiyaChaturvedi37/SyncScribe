// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./App.css";

// function Editor() {
//   const { id } = useParams(); // new ya existing document ID
//   const navigate = useNavigate();
//   const [content, setContent] = useState("");

//   const handleSave = () => {
//     // abhi ke liye console me save, baad me backend se save karenge
//     console.log("Saving document:", { id, content });
//     alert("Document saved (dummy). Backend se connect karenge baad me 🚀");
//   };

//   const handleBack = () => {
//     navigate("/dashboard");
//   };

//   return (
//     <div className="editor-container">
//       <div className="editor-header">
//         <button className="btn back" onClick={handleBack}>
//           ← Back
//         </button>
//         <h2>Editing Document: {id}</h2>
//         <button className="btn save" onClick={handleSave}>
//           💾 Save
//         </button>
//       </div>

//       <textarea
//         className="editor-textarea"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Start typing your document..."
//       />
//     </div>
//   );
// }

// export default Editor;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./App.css";

// function Editor() {
//   const [text, setText] = useState("");

//   const handleSave = () => {
//     alert("Document Saved: " + text);
//   };

//   return (
//     <div className="editor-container">
//       {/* Top Bar */}
//       <div className="editor-header">
//         <Link to="/dashboard" className="back-btn">← Back</Link>
//         <h2>Editing Document:</h2>
//         <button className="save-btn" onClick={handleSave}>Save</button>
//       </div>

//       {/* Full Editor Area */}
//       <textarea
//         className="editor-textarea"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Start typing your document..."
//       />
//     </div>
//   );
// }

// export default Editor;

// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const Editor = () => {
//   const [content, setContent] = useState("");

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["blockquote", "code-block"],
//       [{ align: [] }],
//       ["link", "image"],
//       ["clean"],
//     ],
//   };

//   return (
//     <div className="flex h-screen w-screen bg-gray-100">
//       {/* Left sidebar */}
//       <div className="w-16 bg-gray-900 text-white flex flex-col items-center py-4 space-y-6">
//         <button className="bg-gray-700 p-2 rounded">🏠</button>
//         <button className="bg-gray-700 p-2 rounded">📄</button>
//         <button className="bg-gray-700 p-2 rounded">⚙️</button>
//       </div>

//       {/* Right main editor area */}
//       <div className="flex flex-col flex-1">
//         {/* Top bar */}
//         <div className="flex justify-between items-center p-4 bg-white shadow">
//           <button className="bg-gray-200 px-3 py-1 rounded">← Back</button>
//           <h2 className="text-xl font-bold">Editing Document</h2>
//           <button className="bg-green-500 text-white px-3 py-1 rounded">
//             Save
//           </button>
//         </div>

//         {/* Editor */}
//         <div className="flex-1 p-6">
//           <ReactQuill
//             value={content}
//             onChange={setContent}
//             modules={modules}
//             theme="snow"
//             style={{
//               background: "white",
//               color: "black",
//               height: "100%",
//               borderRadius: "10px",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Editor;

// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// export default function Editor() {
//   const [content, setContent] = useState("");

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
//     <div className="flex min-h-screen bg-black text-white">
//       {/* Sidebar */}
//       <div className="w-[250px] bg-neutral-900 p-4 flex flex-col gap-4">
//         <button className="bg-neutral-700 p-2 rounded">← Back</button>
//         <button className="bg-neutral-700 p-2 rounded">Save</button>
//         <button className="bg-neutral-700 p-2 rounded">Settings</button>
//         <button className="bg-neutral-700 p-2 rounded">Delete</button>
//       </div>

//       {/* Editor Area */}
//       <div className="flex-1 flex justify-center items-start overflow-auto p-10">
//         <div className="bg-white text-black rounded-lg shadow-2xl p-6 w-[800px] min-h-[90vh]">
//           <h2 className="text-2xl font-bold mb-4">Editing Document</h2>
//           <ReactQuill
//             value={content}
//             onChange={setContent}
//             modules={modules}
//             theme="snow"
//             style={{
//               height: "70vh",
//               border: "none",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "./editor.css";   // 👈 apni CSS file import

// export default function Editor() {
//   const [content, setContent] = useState("");

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
//     <div className="flex min-h-screen bg-black text-white">
//       {/* Sidebar */}
//       <div className="w-[250px] bg-neutral-900 p-4 flex flex-col gap-4">
//         <button className="bg-neutral-700 p-2 rounded">← Back</button>
//         <button className="bg-neutral-700 p-2 rounded">Save</button>
//         <button className="bg-neutral-700 p-2 rounded">Settings</button>
//         <button className="bg-neutral-700 p-2 rounded">Delete</button>
//       </div>

//       {/* Editor Area */}
//       <div className="flex-1 flex justify-end items-start overflow-auto p-10">
//         <div className="bg-white text-black rounded-lg shadow-2xl p-6 w-[800px] min-h-[90vh]">
//           <h2 className="text-2xl font-bold mb-4">Editing Document</h2>
//           <ReactQuill
//             value={content}
//             onChange={setContent}
//             modules={modules}
//             theme="snow"
//             style={{
//               height: "70vh",
//               border: "none",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

