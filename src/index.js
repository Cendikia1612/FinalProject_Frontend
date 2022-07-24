import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EditProfile from "./pages/EditProfile";
import UpdateProduct from "./pages/UpdateProduct";
import Account from "./pages/Account";
import DaftarJual from "./pages/DaftarJual";
import DetailProduct from "./pages/DetailProduct";
import DetailProductBuyer from "./pages/DetailProductBuyer"
import { Provider } from "react-redux";
import { store } from "./app/store";
import InfoProduct from "./pages/InfoProduct";
import InfoPenawar from "./pages/InfoPenawar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/updateproduct/:id" element={<UpdateProduct />} />
        <Route path="/infoproduct" element={<InfoProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/seller/daftar-jual" element={<DaftarJual />} />
        <Route path="/detailproduct" element={<DetailProduct />} />
        <Route path="/detailproductbuyer" element={<DetailProductBuyer />} />
        <Route path="/infopenawar" element={<InfoPenawar/>} />
      </Routes>
    </Router>
  </Provider>
);