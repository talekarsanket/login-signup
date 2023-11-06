import React from 'react';
import "./navbar.css"

import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const checkLogin = document.cookie.includes("token");
    console.log("chexkloginnnn ----", checkLogin);

    const removeCookie = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    return (
        <div className="navbar">
            <NavLink to={"/"}> HOME </NavLink>
            {checkLogin ? (
                <NavLink to={"/login"} onClick={removeCookie}> LOGOUT </NavLink>
            ) : (
                <>
                    <NavLink to={"/signup"}> SIGNUP </NavLink>
                    {/* <NavLink to={"/login"}> LOGIN </NavLink> */}
                </>
            )}
        </div>
    );
}

export default Navbar;
