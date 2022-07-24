import "../css/main.css";
import React from "react";
import { Card, Container } from "react-bootstrap"

export default function CardProduct({product}) {
  
  const title = {
    fontSize: "14px",
  };

  const image = {
    width: "100%",
    // height: "100px",
    objectFit: "cover",
    margin: "8px",
  };

  const accesoris = {
    fontSize: "11px",
    opacity: "0.5",
  };

  const productCard = {
    maxWidth: "80%",
    maxHeight: "100%",
  };

  return (
    <Container className="card-content">
      {product ? product.map((product) => (
        <div key={product.id}>
          <Card>
            <Card.Img
              className="w-75 align-self-center img-fluid"
              variant="top"
              multiple
              src={`${product.image}`}
              style={image}
            />
            <Card.Body className="p-2">
              <Card.Title className="mb-0" style={title}>
                {product.name}
              </Card.Title>
              <p className="mb-0" style={accesoris}>
                {product.category}
              </p>
              <Card.Text className="mb-1">{product.price}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )) : ""}
    </Container>

  );
}