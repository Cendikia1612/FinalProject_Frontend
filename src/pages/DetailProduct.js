import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import "../css/detailproduct.css";
// import "../css/main.css";
import Navbar from "../component/NavBar";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, Link, useParams, Navigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';



function DetailProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});

    const [errorResponse, setErrorResponse] = useState({
        isError: false,
        message: "",
    });

    const fetchData = async () => {
        try {
            // Check status user login
            // 1. Get token from localStorage
            const token = localStorage.getItem("token");

            // 2. Check token validity from API
            const currentUserRequest = await axios.get(
                "http://localhost:2000/api/v1/product",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const currentUserResponse = currentUserRequest.data;

            if (currentUserResponse.status) {
                setUser(currentUserResponse.data.user);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getProduct = async () => {
        try {
            const token = localStorage.getItem("token");
            const responseProduct = await axios.get(`http://localhost:2000/api/v1/product`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const dataProduct = await responseProduct.data.data.getProductById;

            setData(dataProduct)
            console.log(dataProduct);
        } catch (err) {
            console.log(err);
        }
    }

    const onUpdate = async (e, isPublish) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const postPayload = new FormData();
            postPayload.append("isPublish", isPublish);

            const createRequest = await axios.put(
                "http://localhost:2000/api/v1/product",
                postPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const createResponse = createRequest.data;
            console.log(createResponse);
            if (createResponse.status) navigate(`/seller/daftar-jual`);
        } catch (err) {
            const response = err.response.data;

            setErrorResponse({
                isError: true,
                message: response.message,
            });
        }
    };

    useEffect(() => {
        getProduct();
        fetchData();
    }, [])

    return (
        <>
            <div className="bg-nav">
                <Navbar />
            </div>
            <Container >
                <div className="flex-container">
                    <div style={{ width: "100%" }}>
                        <div className="carousel">
                            <Carousel>
                                {data.image ? data.image.map((image) => (
                                    <Carousel.Item>
                                        <div>
                                            <Link className="arrow2" to="editprofile/" style={{ color: "black" }}>
                                                <FiArrowLeft />
                                            </Link>
                                            <img
                                                className="d-block w-100 "
                                                src={`${image}`}
                                                alt=''
                                            />
                                        </div>
                                    </Carousel.Item>
                                )) : ""}
                            </Carousel>
                        </div>
                    </div>

                    <div style={{ width: "45%", justifyContent: "space-around", marginLeft: "30px" }} className="top-20">
                        <div class="textShadowBox2  w-100  mt-4">
                            <h4>{data.name}</h4>
                            <h6>{data.category}</h6>
                            <h5>{data.price}</h5>
                            <Button className="btnPurple w-100 mt-2 mb-2" type='submit' onClick={(e) => onUpdate(e, true)} > Terbitkan</Button>
                        <Link to={`http://localhost:2000/api/v1/product`}>
                            <Button
                                className="btnPurple2 w-100 mt-2 "
                                style={{ background: "#FFFFFF", color: "black" }}
                            >
                                Edit
                            </Button>
                        </Link>
                    </div>

                    <div class="textShadowBox2  mt-4 " >
                        <div className="justify-content-start">
                            <div className="flex-container2">
                                <div>
                                    <img src={`${user.image}`} style={{ height: '48px', width: '48px', objectFit: 'cover', borderRadius: '12px' }} alt='' />
                                </div>
                                <div style={{ marginLeft: '1rem' }}>
                                    <h5>{user.name}</h5>
                                    <h5>{user.kota}</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="desc">
                <div className="textShadowBox p-4 mt-4 mb-4">
                    <h4>Deskripsi</h4>
                    <div>
                        {data.description}
                    </div>
                </div>
            </div>
            {errorResponse.isError && (
                <Alert variant="danger" className="mt-2">{errorResponse.message}</Alert>
            )}
        </Container>
        </>
    );
}

export default DetailProduct;
