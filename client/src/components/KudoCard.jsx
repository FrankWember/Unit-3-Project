import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import KudoCardBoard from "./KudoCardBoard";
import Header from "./Header";
import Footer from "./Footer";

function KudoCard() {
  const [showModal, setShowModal] = useState(false);
  const [Cardtitle, setCardTitle] = useState("");
  const [CardDescription, setCardDescription] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);
  const [createdKudoCard, setCreatedKudoCard] = useState([]); // a State to hold the created KudoCard

  const { boardId } = useParams();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    fetchKudoCard();
  }, [boardId]);

  const fetchKudoCard = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/kudoboard/${boardId}/kudocards`
      );
      const data = await response.json();
      console.log(data);
      setCreatedKudoCard(data);
    } catch (error) {
      console.error("Error fetching the kudos:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=F4oOmW6fZTYbnki0rHSIkmyMSroKqsmf&q=${searchTerm}&limit=5`
      );
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error("Error searching GIFs:", error);
    }
  };

  const handleCreateCard = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/kudoboard/${boardId}/kudocard`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: Cardtitle,
            description: CardDescription,
            giphyPicture: selectedGif.images.original.url || "",
            authorId: authorId,
          }),
        }
      );
      console.log(response);

      const newKudoCard = await response.json();
      console.log(newKudoCard);
      setCreatedKudoCard([...createdKudoCard, newKudoCard]); // Store the created KudoCard in state
      handleCloseModal();
    } catch (error) {
      console.error("Error creating KudoCard:", error);
    }
  };

  const handleDelete = async (kudoId) => {
    try {
      const response = await fetch(`http://localhost:3000/kudocard/${kudoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete KudoCard");
      }

      setCreatedKudoCard((prevKudoCards) =>
        prevKudoCards.filter((kudo) => kudo.id !== kudoId)
      );
    } catch (error) {
      console.error("Error deleting KudoCard:", error);
    }
  };
  console.log(createdKudoCard);

  return (
    <>
      <div>
        <Header />
        <Button variant="primary" onClick={handleShowModal}>
          Create New Card
        </Button>

        <Modal
          show={showModal}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
        >
          <Form onSubmit={handleCreateCard}>
            <Modal.Header closeButton onClick={handleCloseModal}>
              <Modal.Title>Create a New Card</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formCardTitle">
                <Form.Label>CardTitle</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a card title"
                  value={Cardtitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCardDescription">
                <Form.Label>CardDescription</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter card description"
                  value={CardDescription}
                  onChange={(e) => setCardDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGifSearch">
                <Form.Label>Search GIFs</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search for GIFs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleSearch} className="mt-2">
                  Search
                </Button>
                <div className="mt-3">
                  {gifs.map((gif) => (
                    <img
                      key={gif.id}
                      src={gif.images.fixed_height.url}
                      alt={gif.title}
                      onClick={() => setSelectedGif(gif)}
                      style={{
                        cursor: "pointer",
                        border:
                          selectedGif?.id === gif.id ? "2px solid blue" : "",
                        margin: "5px",
                        width: "200px",
                      }}
                    />
                  ))}
                </div>
                {selectedGif && (
                  <div className="mt-3">
                    <h5>Selected GIF</h5>
                    <img
                      src={selectedGif.images.original.url}
                      alt={selectedGif.title}
                      style={{ width: "200px" }}
                    />
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPicture">
                <Form.Label>Picture</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Picture Url"
                  value={selectedGif?.images.original.url}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAuthorId">
                <Form.Label>Author Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Author Id"
                  value={authorId}
                  onChange={(e) => setAuthorId(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Create
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <KudoCardBoard kudos={createdKudoCard} onDelete={handleDelete} />
        <Footer />
      </div>
    </>
  );
}

export default KudoCard;
