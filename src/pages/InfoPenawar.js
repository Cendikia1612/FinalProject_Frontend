import { Profiler, useEffect, useRef, useState } from "react";
import { Nav, Navbar, Form, Container, Button, Alert } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FiCamera, FiArrowLeft } from "react-icons/fi";
import "../css/mainRio.css";
import {
    Stack,
    Row,
    Col,
    Card,
    Modal,
} from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { ModalPenawar } from "../component/modalStatus";

export default function InfoPenawar() {
    //   const [post, setPost] = useState([]);

    //   useEffect(() => {
    //     const postData = async () => {
    //       const response = await axios.get(`http://localhost:2000/v1/products/search`);
    //       console.log(response);
    //       const data = await response.data.data.handle_get_all_product;
    //       console.log(data);

    //       setPost(data);
    //     };
    //     postData();
    //   }, []);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            {/* navbar */}
            <div className="na1 py-4 shadow">
                <nav className="navbar navbar-expand-lg navbar-light bg-all">
                    <Link to="/">
                        <button className="na2 navbar-brand box"></button>
                    </Link>
                    <Navbar.Brand href="#" className="brand" />
                    <div className="offcanvas-body" id="offcanvasRight">
                        <div className="info1 navbar">
                            <Nav className="text-dark"> Info Penawar </Nav>
                        </div>
                    </div>
                </nav>
            </div>
            <div>
                <div className="col-6 text-center mt-3">
                    <Link className="arrow2" to="/" style={{ color: "black" }}>
                        <FiArrowLeft />
                    </Link>
                </div>
                <Row>
                    <div className="col-2"></div>
                    <div className="col-4 mt-4">
                        <div className="radius-primary box-shadow p-3">
                            <Stack direction="horizontal" gap={3}>
                                <img src="../images/profile.png" alt="" />
                                <Stack>
                                    <p className="m-0 fw-bold">Nama Penjual</p>
                                    <p className="m-0 text-black-50">Kota</p>
                                </Stack>
                            </Stack>
                        </div>
                        <style jrx>
                            {`
                                .box-shadow {
                                    background-color: white;
                                    border-radius: 25px;
                                    box-shadow: 3px 2px 2px 2px grey
                                }
                            `}
                        </style>
                        <div className="d-flex flex-row mt-3">
                            <p className="m-0 fw-bold">Nama Penjual</p>
                        </div>
                        <div className=" radius-primary p-2 mt-3">
                            <Stack direction="horizontal" gap={3}>
                                <img src="../images/profile.png" alt="" />
                                <Stack>
                                    <p className="m-0 text-black-50">Kota</p>
                                    <p className="m-0">Jam Tangan Casio</p>
                                    <p className="m-0">Rp 250.000</p>
                                    <p className="m-0">Ditawar Rp 200.000</p>
                                </Stack>
                                <Stack>
                                    {" "}
                                    <p className="m-0 text-black-50 text-end">20 Apr, 14:04</p>
                                </Stack>
                            </Stack>
                        </div>
                        <div className="col-6 d-flex ms-auto">
                            <Button
                                variant="outline-primary"
                                className=" w-50 radius-primary btn me-3"
                                type="submit"
                            >
                                Tolak
                            </Button>{" "}
                            <Button
                                className=" w-50 radius-primary btn1"
                                type="submit"
                                onClick={handleShow}
                            >
                                Terima
                            </Button>
                            <style jrx>{`
                                .btn1 {
                                    background-color: blueviolet;
                                }
                                .btn {
                                    border-radius: 25px;
                                }
                                .btn:hover {
                                    background-color: blueviolet;
                                }
                            `}</style>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <div className="p-3">
                                <Modal.Header closeButton className="border-0">
                                    <Modal.Title></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p className="fw-bold">Perbarui status penjualan produkmu</p>
                                    <p className="text-black-50">
                                        Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya
                                    </p>
                                    <h5 className="text-center mb-3">Product Match</h5>
                                    <Stack
                                        direction="horizontal"
                                        gap={3}
                                        className="bg-color-grey radius-secondary p-2"
                                    >
                                        <img
                                            src="../images/jam1.png"
                                            alt=""
                                            style={{
                                                width: "48px",
                                                height: "48px",
                                                objectFit: "cover",
                                                borderRadius: "12px",
                                            }}
                                        />
                                        <Stack>
                                            <p className="m-0 fw-bold">Nama Pembeli</p>
                                            <p className="m-0 text-black-50">Kota</p>
                                        </Stack>
                                    </Stack>
                                    <Stack
                                        direction="horizontal"
                                        gap={3}
                                        className="bg-color-grey radius-secondary p-2"
                                    >
                                        <img
                                            src="../images/jam1.png"
                                            alt=""
                                            style={{
                                                width: "48px",
                                                height: "48px",
                                                objectFit: "cover",
                                                borderRadius: "12px",
                                            }}
                                        />
                                        <Stack>
                                            <p className="m-0 fw-bold">Jam Tangan Casio</p>
                                            <p className="m-0">Rp 250.000</p>
                                            <p className="m-0">Ditawar Rp 200.000</p>
                                        </Stack>
                                    </Stack>
                                </Modal.Body>
                                <Modal.Footer className="pe-5 d-gird gap-2">
                                    <Button
                                        className=" w-100 btn2 border-0"
                                        onClick={handleClose}
                                    >
                                        Hubungi via Whatsapp
                                        <FaWhatsapp className="mx-2" />
                                    </Button>
                                    <style jsx>{`
                                                .btn2 {
                                                    background-color: purple;
                                                }
                                            `}</style>
                                </Modal.Footer>
                            </div>
                        </Modal>
                        <ModalPenawar />
                    </div>
                </Row>
            </div>
        </div>
    );
}
