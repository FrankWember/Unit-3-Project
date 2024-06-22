import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormSelect from "react-bootstrap/FormSelect";

function CreateKudo({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [authorId, setAuthorId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    onClose();
    try {
      console.log(title, category, authorId);
      const response = await fetch("http://localhost:3000/kudoboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, authorId }),
      });
      const data = await response.json();
      onCreate(data);

      console.alert(`Kudos for ${title} was created successfully`);
    } catch (error) {
      console.error("Error creating Kudo:", error);
    }
  };

  return (
    <>
      <Modal show={onClose} backdrop="static" keyboard={false}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton onClick={onClose}>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select a category</option>
                <option value="Recent">Recent</option>
                <option value="Celebration">Celebration</option>
                <option value="Thank You">Thank You</option>
                <option value="Inspiration">Inspiration</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>authorId</Form.Label>
              <Form.Control
                type="text"
                placeholder="Author Id"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default CreateKudo;
