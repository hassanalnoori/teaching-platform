import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("video");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("File uploaded successfully!");
      setTitle("");
      setType("video");
      setFile(null);
    } catch (err) {
      console.error(err);
      setError("Failed to upload file");
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="video">Video</option>
          <option value="image">Image</option>
          <option value="file">File</option>
        </select>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;
