import React, { useState, useEffect } from "react";
import { getPosts, updatePost, deletePost } from "../../api";
import {
  Container,
  Table,
  Button,
  Form,
  Modal,
  Alert,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";

const TeacherDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("file");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setType(post.type);
    setShowEditPostModal(true);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", editingPost.id);
    formData.append("title", title);
    formData.append("type", type);
    if (file) {
      formData.append("file", file);
    }

    try {
      await axios.put("http://localhost:3000/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Post updated successfully!");
      setShowEditPostModal(false);
      setEditingPost(null);
      setTitle("");
      setType("file");
      setFile(null);
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to update post");
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      alert("Post deleted successfully!");
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to delete post");
    }
  };

  const handleUploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    if (file) {
      formData.append("file", file);
    }

    try {
      await axios.post("http://localhost:3000/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("File uploaded successfully!");
      setShowUploadModal(false);
      setTitle("");
      setType("file");
      setFile(null);
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to upload file");
    }
  };

  return (
    <Container className="mt-5">
      <h1>Teacher Dashboard</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={() => setShowUploadModal(true)}>
        Upload File
      </Button>
      <Row className="mt-3">
        {posts.map((post) => (
          <Col key={post.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                {post.type === "video" && post.file_data && (
                  <video
                    src={`data:${post.file_mime};base64,${post.file_data}`}
                    controls
                    className="w-100"
                  />
                )}
                {post.type === "image" && post.file_data && (
                  <Card.Img
                    variant="top"
                    src={`data:${post.file_mime};base64,${post.file_data}`}
                    alt={post.title}
                  />
                )}
                {post.type === "file" && post.file_data && (
                  <Card.Link
                    href={`data:${post.file_mime};base64,${post.file_data}`}
                    download={post.file_name}
                  >
                    {post.title}
                  </Card.Link>
                )}
                <Card.Text>Posted by: {post.created_by}</Card.Text>
                <Card.Text>Stage: {post.stage_name}</Card.Text>
                <Card.Text>Subject: {post.subject_name}</Card.Text>
                <Card.Text>Posted at: {post.created_at}</Card.Text>
                <Button variant="warning" onClick={() => handleEditPost(post)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeletePost(post.id)}
                  className="ml-2"
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Upload File Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleUploadFile}>
            <Form.Group controlId="formFileTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFileType">
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
              <Form.Control type="file" onChange={handleFileChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Upload File
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Post Modal */}
      <Modal
        show={showEditPostModal}
        onHide={() => setShowEditPostModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleUpdatePost}>
            <Form.Group controlId="formPostTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPostType">
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
              Update Post
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TeacherDashboard;
