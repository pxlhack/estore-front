import { Link } from "react-router-dom";
import React from "react";
import "./styles/header.css"

function Header() {
    return (
        <>
            <div className="header-container">
                <header>
                    <Link to="/electro-items" className="header-link">Товары</Link>
                    <Link to="/shops" className="header-link">Магазины</Link>
                    <Link to="/employees" className="header-link">Сотрудники</Link>
                </header>
            </div>
        </>
    );
}

export default Header;