import React, { useState } from "react";
import { login } from "../../api";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = ({ setToken }) => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await login(fullName, password, code);
      setToken(token);
      localStorage.setItem("token", token);
      // Redirect based on user role
      if (user.role === "admin") {
        window.location.href = "/admin";
      } else if (user.role === "teacher") {
        window.location.href = "/teacher";
      } else if (user.role === "student") {
        window.location.href = "/student";
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <Container className="mt-5">
      <h1>Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCode">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
      <Button
        variant="link"
        onClick={() => navigate("/register")}
        className="mt-3"
      >
        Create an Account
      </Button>
    </Container>
  );
};

export default Login;
