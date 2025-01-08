import React from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const ModalForm = ({
  show,
  onHide,
  title,
  error,
  onSubmit,
  submitButtonText,
  children,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={onSubmit}>
          {children}
          <Button variant="primary" type="submit" className="mt-3">
            {submitButtonText}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
