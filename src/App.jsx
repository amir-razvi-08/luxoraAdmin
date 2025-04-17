import React, { useEffect, useState } from "react";
import AdminLogin from "./pages/AdminLogin";
import AdminNavbar from "./adminComponents/AdminNavbar";
import Sidebar from "./adminComponents/Sidebar";
import AddProduct from "./adminPages/AddProduct";
import ListProducts from "./adminPages/ListProducts";
import OrdersProduct from "./adminPages/OrdersProduct";
import AdminHome from "./adminPages/AdminHome";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        axios
            .get("/api/v1/admin/is-auth", { withCredentials: true })
            .then((res) => {
                setIsAuthenticated(true);
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, []);

    useEffect(() => {
        if (isAuthenticated === null) {
          Swal.fire({
            title: "Checking login...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
        } else {
          Swal.close();
        }
      }, [isAuthenticated]);
      

    return (
        <>
            {isAuthenticated ? (
                <div className="min-h-screen w-full">
                    <AdminNavbar />
                    <hr />
                    <div className="flex w-full  gap-10 ">
                        <Sidebar />
                        <div className="py-5 w-full">
                            <Routes>
                                <Route path="/" element={<AdminHome />} />
                                <Route path="/add-product" element={<AddProduct />} />
                                <Route path="/list-products" element={<ListProducts />} />
                                <Route path="/orders" element={<OrdersProduct />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <AdminLogin />
                </>
            )}
        </>
    );
}

export default App;
