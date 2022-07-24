import { useEffect, useRef, useState } from "react";
import {
  Nav,
  Navbar,
  Form,
  Container,
  Alert,
  Button,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import "../css/mainRio.css";
import { useDropzone } from "react-dropzone";
import { addProduct } from "../slices/productSlice";


function InfoProduct(props) {
  const navigate = useNavigate();
  const nameField = useRef("");
  const priceField = useRef("");
  const categoryField = useRef("");
  const descriptionField = useRef("");
  const [isSold, setIsSold] = useState(Boolean);
  const dispatch = useDispatch();

  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };

  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };

  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };

  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);


  const onCreate = async (e, isPublish) => {
    e.preventDefault();


    try {
      const token = localStorage.getItem("token");
      const postPayload = new FormData();
      postPayload.append("name", nameField.current.value);
      postPayload.append("price", priceField.current.value);
      postPayload.append("category", categoryField.current.value);
      postPayload.append("description", descriptionField.current.value);
      postPayload.append("sold", isSold);
      postPayload.append("isPublish", isPublish);
      files.forEach(element => {
      postPayload.append("image", element);
      });

      const createRequest = await axios.post(
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

      dispatch(
        addProduct(createResponse.message)
      )

      if (createResponse.status) {
        if (isPublish) navigate("/seller/daftar-jual");
        else navigate("/seller/daftar-jual")
      }

     } catch (err) {
     const response = err.response.data;
    setErrorResponse({
    isError: true,
      // message: response.message,
   });
  }
   };

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
              <Nav className="text-dark"> Lengkapi Detail Produk </Nav>
            </div>
          </div>
        </nav>
      </div>

      <Container className="my-5 w-50">
        <div>
          <Link className="arrow2" to="/" style={{ color: "black" }}>
            <FiArrowLeft />
          </Link>
        </div>
        <div>
          <Nav className="info3 text-dark">Lengkapi Detail Produk</Nav>
        </div>
        <Form className="border1 mb-3" style={{ fontWeight: "bold" }}>
          <Form.Label>Nama Produk</Form.Label>
          <Form.Control type="text" ref={nameField} placeholder="Nama" />
        </Form>
        <Form className="border1 mb-3" style={{ fontWeight: "bold" }}>
          <Form.Label>Harga Produk</Form.Label>
          <Form.Control type="text" ref={priceField} placeholder="Rp 0,00" />
        </Form>
        <Form.Group className="mb-3" style={{ fontWeight: "bold" }}>
          <Form.Label>Kategori</Form.Label>
          <select ref={categoryField} className="form-select">
            <option hidden>Pilih Kategori</option>
            <option value="hobi">Hobi</option>
            <option value="Accessories">Accessories</option>
            <option value="Baju">Baju</option>
            <option value="Elektronik">Elektronik</option>
            <option value="kesehatan">Kesehatan</option>
          </select>
        </Form.Group>
        <Form.Group className="mb-3" style={{ fontWeight: "bold" }}>
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control
            type="text"
            ref={descriptionField}
            placeholder="Contoh: Jalan Ikan Hiu 33"
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Form.Group className="mb-3" style={{ fontWeight: "bold" }}>
          Foto Produk
        </Form.Group>
        <section className="container">
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            {files.length === 0 ? <button className="mb-3 box2" >
              <h2>
                <BiPlus className="plus"/>
              </h2>
            </button> :
              <div>
                {thumbs}
              </div>}
          </div>
        </section>
        <div className="d-flex justify-content-between">
          <Button className="myButton7" type="submit" onClick={(e) => onCreate(e, false)}>
            Preview
          </Button>
          <Button className="myButton6" type="submit" onClick={(e) => onCreate(e, true)}>
            Terbitkan
          </Button>
        </div>
        {errorResponse.isError && (
          <Alert variant="danger">{errorResponse.message}</Alert>
        )}
      </Container>
    </div>
  );
}

export default InfoProduct;
