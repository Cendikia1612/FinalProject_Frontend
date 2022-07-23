import React from "react";
import "../css/daftarJual.css";
import { Container } from "react-bootstrap";


export default function CardProduct() {

    const text = {
        fontSize: "16px",
        textAlign: "center",
    };

    const image = {
        width: "276px",
        height: "194px",
    };

    const productCard = {
        width: "300px",
    };

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center">
                <div style={productCard} className="my-4">
                    <div className="d-flex align-items-center justify-content-center mb-3">
                        <img style={image} src="/images/wishlist.png" alt=""/>
                    </div>
                    <p style={text}>
                        Belum ada produkmu yang diminati nih, sabar ya rejeki nggak kemana kok
                    </p>
                </div>
            </Container>
        </>
    );
}