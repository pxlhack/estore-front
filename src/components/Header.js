import { Link } from "react-router-dom";
import React from "react";
import "./styles/header.css"

function Header() {
    return (
        <>
            <div className="header-container">
                <header>
                    <Link to="/electro-items" className="header-link">Товары</Link>
                </header>
            </div>
        </>
    );
}

export default Header;
