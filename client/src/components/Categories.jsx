import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function Categories({ onFilter }) {
  const categories = [
    "All",
    "Recent",
    "Celebration",
    "Thank You",
    "Inspiration",
  ];

  const handleClick = (category) => {
    onFilter(category);
  };

  const getButtonVariant = (category) => {
    switch (category) {
      case "All":
        return "primary";
      case "Recent":
        return "secondary";
      case "Celebration":
        return "success";
      case "Thank You":
        return "warning";
      case "Inspiration":
        return "info";
      default:
        return "primary";
    }
  };

  return (
    <div className="d-flex justify-content-center my-4">
      <ButtonGroup>
        {categories.map((category) => (
          <Button
            key={category}
            variant={getButtonVariant(category)}
            onClick={() => handleClick(category)}
            className="mx-2"
          >
            {category}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default Categories;
