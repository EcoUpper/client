import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="container">
            <p>2023 EcoUpper. All rights reserved</p>
            <Link to="/About">About Us</Link>
            </div>
        </footer>
    )
}

export default Footer; 