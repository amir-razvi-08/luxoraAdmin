import React, { useContext } from "react";
import { assets } from "../adminAssets/assets";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Navbar = () => {
    const { serverURL } = useContext(ShopContext);

    const handleLogout = async () => {
        try {
            

            const response = await axios.post(
                serverURL + "/admin/logout",
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                toast.success("Logout successful");
                localStorage.removeItem("authToken");
                localStorage.removeItem("admin");
                toast.success("logout successfully")
            }
        } catch (e) {
            toast.error(e.response?.data?.message || "Logout failed");
        }
    };

    return (
        <header className="flex py-2 px-[4%] justify-between">
            <img className="w-[max(10%,80px)]" src={assets.logo} alt="logo" />
            <button onClick={handleLogout} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full">
                Logout
            </button>
        </header>
    );
};

export default Navbar;
