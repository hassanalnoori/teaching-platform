import React, { useState } from "react";
import { addPost } from "../../api";
import { Form, Button, Alert, Container } from "react-bootstrap";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
    formData.append("content", content);
    formData.append("type", type);
    if (file) {
      formData.append("file", file);
    }

    try {
      await addPost(formData);
      alert("Post added successfully!");
      setTitle("");
      setContent("");
      setType("video");
      setFile(null);
    } catch (err) {
      console.error(err);
      setError("Failed to add post");
    }
  };

  return (
    <Container className="mt-5">
      <h1>Add New Post</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="video">Video</option>
            <option value="image">Image</option>
            <option value="file">File</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formFile">
          <Form.Label>File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Add Post
        </Button>
      </Form>
    </Container>
  );
};

export default PostForm;
