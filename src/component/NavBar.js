import "../css/main.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Navbar, Container, Button, Dropdown, Offcanvas } from "react-bootstrap";
import { FiLogIn, FiList, FiUser, FiBell } from "react-icons/fi";
import { addUser } from "../slices/userSlice";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import { addSearch } from "../slices/searchingSlice";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    background: '#EEEEEE',
    borderRadius: '16px',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    display: 'block',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '35ch',
        },
    },
}));


export default function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [searching, setSearching] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //change nav color when scrolling
    const [color, setColor] = useState(false);
    const changeColor = () => {
        if (window.scrollY >= 10) {
            setColor(true)
        } else {
            setColor(false)
        }
    }

    const handleSearch = () => {
        dispatch(
            addSearch(searching)
        )
    }

    window.addEventListener('scroll', changeColor)


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check status user login
                // 1. Get token from localStorage
                const token = localStorage.getItem("token");

                // 2. Check token validity from API
                const currentUserRequest = await axios.get(
                    "http://localhost:2000/api/v1/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const currentUserResponse = currentUserRequest.data;

                if (currentUserResponse.status) {
                    dispatch(
                        addUser({
                            user: currentUserResponse.data.user,
                            token: token,
                        })
                    );
                    setUser(currentUserResponse.data.user);
                }
            } catch (err) {
                setIsLoggedIn(false);
            }
        };
        handleSearch();
        fetchData();
    }, [searching]);



    return (
        <>
            <Navbar expand="lg" className={color ? 'navbar-scroll' : 'navbar1'} >
                <Container className="home-navbar" >
                    <Navbar.Brand className="logo" href="/"></Navbar.Brand>
                    <div className="me-auto">
                        <Search>
                            <SearchIcon className="search-icon" />
                            <StyledInputBase
                                onChange={(e) => {
                                    setSearching(e.target.value)
                                }}
                                placeholder="Cari di sini …"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </div>
                    <div>
                        <Navbar.Toggle onClick={handleShow} aria-controls="off-canvas" />
                        <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                            {!isLoggedIn ? (
                                <Navbar.Offcanvas show={show} onHide={handleClose} id="off-canvas">
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title className="title-navbar-mobile">Second Hand</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Button variant="success" className="button-register" href="/login">
                                            <FiLogIn className="icon-register" />
                                            Masuk
                                        </Button>
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>

                            ) : (
                                <>
                                    <Button className="home-navbar-user" href="/seller/daftar-jual"><FiList className="icon-list-header" /></Button>
                                    <Dropdown >
                                        <Dropdown.Toggle variant="white" id="dropdown-basic">
                                            <FiBell className="icon-bell-header" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu align="end">
                                            <Dropdown.Item href="#/action-1">
                                                <div class="d-flex my-1">
                                                    {/* <img
                                                        src={`http://localhost:8888/public/files/${user.image}`}
                                                        style={{ width: '60px', height: '60px', marginTop: '5px' }}
                                                        alt=""
                                                    /> */}
                                                    <div class="mx-3">
                                                        <p className="mb-0 notif-accesoris">Hobi</p>
                                                        <p className="mb-0">Jam Tangan Casio</p>
                                                        <p className="mb-0">Rp.250.000</p>
                                                        <p className="mb-0">Ditawarkan Rp.10.000</p>
                                                    </div>
                                                    <div class="ms-auto">
                                                        <p className="mb-0 notif-accesoris">
                                                            7 Juli, 14.00
                                                        </p>
                                                    </div>
                                                </div>
                                                <Divider variant="middle" className="mt-3"/>
                                            </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>

                                    <Button className="home-navbar-user" href="/account"><FiUser className="icon-user-header" /></Button>

                                    <Offcanvas show={show} onHide={handleClose} id="off-canvas">
                                        <Offcanvas.Header closeButton>
                                            <Offcanvas.Title className="title-navbar-mobile">Second Hand</Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body>
                                            <Dropdown.Item href="#/action-1">Notifikasi</Dropdown.Item>
                                            <Dropdown.Item className="mt-2" href="/seller/daftar-jual">Daftar Jual</Dropdown.Item>
                                            <Dropdown.Item className="mt-2" href="/account">Akun Saya</Dropdown.Item>
                                        </Offcanvas.Body>
                                    </Offcanvas>
                                </>
                            )
                            }
                        </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>
        </>
    );
}


