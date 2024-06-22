import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function KudoBoard({ kudos, onDelete }) {
  const navigate = useNavigate(); //
  console.log(kudos);
  const handleCard = (boardId) => {
    navigate(`/kudocard/${boardId}`);
  };

  return (
    <div className="container my-2">
      <div className="row g-1 justify-content-around">
        {kudos.map((kudo) => (
          <div key={kudo.id} className="col-12 col-sm-6 col-md-5 col-lg-3 mt-5">
            <Card style={{ width: "220px", height: "300px" }}>
              <Card.Img
                variant="top"
                src={`https://picsum.photos/id/${kudo.id}/237/200`}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "20px",
                    fontFamily: "cursive",
                    fontWeight: "bolder",
                  }}
                >
                  {kudo.title}
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "11px",
                    fontFamily: "italics",
                    fontWeight: "bold",
                  }}
                >
                  {kudo.category}
                </Card.Text>
                <Button
                  variant="primary"
                  style={{ fontSize: "10px" }}
                  onClick={() => handleCard(kudo.id)}
                >
                  View Board
                </Button>
                <Button
                  variant="danger"
                  style={{ fontSize: "10px", marginLeft: "10px" }}
                  onClick={() => onDelete(kudo.id)}
                >
                  Delete Board
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KudoBoard;
