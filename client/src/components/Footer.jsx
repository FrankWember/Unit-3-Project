import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <Container>
        <p className="mb-0">&copy; 2024 KudoBoard. All rights reserved.</p>
        <Nav className="justify-content-center">
          <Nav.Link href="#privacy" className="text-white">
            Privacy Policy
          </Nav.Link>
          <Nav.Link href="#terms" className="text-white">
            Terms of Service
          </Nav.Link>
        </Nav>
      </Container>
    </footer>
  );
}

export default Footer;
