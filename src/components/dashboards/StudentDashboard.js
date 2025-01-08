import React, { useState, useEffect } from "react";
import { getPostsByStage } from "../../api";
import { Container, Card, Row, Col, Alert } from "react-bootstrap";

const StudentDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPostsByStage();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch posts");
      }
    };
    fetchPosts();
  }, []);

  return (
    <Container className="mt-5">
      <h1>Student Dashboard</h1>
      {error && <Alert variant="danger">{error}</Alert>}
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StudentDashboard;
