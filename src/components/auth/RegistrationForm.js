import React, { useState } from "react";
import { registerUser } from "../../api";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ fullName, password, code });
      setSuccess("Registration successful!");
      setFullName("");
      setPassword("");
      setCode("");
    } catch (err) {
      console.error(err);
      setError("Failed to register");
    }
  };

  return (
    <Container className="mt-5">
      <h1>Register</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
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
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <Button
        variant="link"
        onClick={() => navigate("/login")}
        className="mt-3"
      >
        Go to Login
      </Button>
    </Container>
  );
};

export default RegistrationForm;
