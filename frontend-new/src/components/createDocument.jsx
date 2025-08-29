import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateDocument() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!title) return alert("Title is required");
    try {
      const res = await fetch("http://localhost:5000/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, password }),
      });
      if (!res.ok) throw new Error("Failed to create document");
      const data = await res.json();
      navigate(`/editor/${data._id}`);
    } catch (err) {
      console.error(err);
      alert("❌ Error creating document");
    }
  };

  return (
    <div className="create-doc-form">
      <h2>Create New Document</h2>
      <input
        type="text"
        placeholder="Document Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Document Content (optional)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="password"
        placeholder="Optional Password / PIN"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleCreate}>Create Document</button>
    </div>
  );
}
