import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function KudoCardBoard({ kudos, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [currentKudo, setCurrentKudo] = useState(null);
  const [comment, setComment] = useState("");
  const [upvotes, setUpvotes] = useState({});
  const [modalComments, setModalComments] = useState([]);
  const navigate = useNavigate();

  const handleUpvote = async (kudoId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/kudocard/${kudoId}/upvote`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const updatedKudo = await response.json();
      setUpvotes((prev) => ({
        ...prev,
        [kudoId]: updatedKudo.upvotes,
      }));
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const handleOpenModal = async (kudo) => {
    setCurrentKudo(kudo);
    setShowModal(true);
    try {
      const response = await fetch(
        `http://localhost:3000/kudoboard/${kudo.boardId}/kudocard/${kudo.id}/comments`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const comments = await response.json();
      setModalComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentKudo(null);
    setComment("");
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        const response = await fetch(
          `http://localhost:3000/kudoboard/${currentKudo.boardId}/kudocard/${currentKudo.id}/comment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: comment }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const newComment = await response.json();
        setComment((prev) => ({
          ...prev,
          [currentKudo.id]: [...(prev[currentKudo.id] || []), newComment],
        }));
        setComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <div className="container my-2">
      <div className="row g-1 justify-content-around">
        {kudos.map((kudo) => (
          <div key={kudo.id} className="col-12 col-sm-6 col-md-5 col-lg-3 mt-5">
            <Card style={{ width: "250px", height: "400px" }}>
              <Card.Title className="text-center" style={{ fontSize: "20px" }}>
                {kudo.title}
              </Card.Title>
              <Card.Img
                variant="top"
                src={kudo.giphyPicture}
                style={{ width: "100%", height: "275px", objectFit: "cover" }}
              />
              <Card.Text style={{ fontSize: "20px" }}>
                {kudo.authorId}
              </Card.Text>
              <Card.Body>
                <Card.Text className="text-center" style={{ fontSize: "20px" }}>
                  {kudo.description}
                </Card.Text>
                <Button
                  variant="primary"
                  style={{ fontSize: "10px" }}
                  onClick={() => handleUpvote(kudo.id)}
                >
                  Upvote: {upvotes[kudo.id] || kudo.upvotes}
                </Button>

                <Button
                  variant="danger"
                  style={{ fontSize: "10px", marginLeft: "10px" }}
                  onClick={() => onDelete(kudo.id)}
                >
                  Delete Board
                </Button>
                <Button
                  variant="primary"
                  style={{ fontSize: "10px" }}
                  onClick={() => handleOpenModal(kudo)}
                >
                  Comments
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Comments for {currentKudo?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitComment}>
            <Form.Group>
              <Form.Label>New Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Submit Comment
            </Button>
          </Form>
          <hr />
          <h5>Comments:</h5>
          <ul>
            {modalComments.map((c, index) => (
              <li key={index}>{c.text}</li>
            ))}
            {modalComments.length === 0 && <li>No comments yet</li>}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default KudoCardBoard;
