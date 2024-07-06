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
                    <Link to="/position-types" className="header-link">Должности</Link>
                    <Link to="/purchases" className="header-link">Покупки</Link>
                    <Link to="/purchase-types" className="header-link">Способы оплаты</Link>
                </header>
            </div>
        </>
    );
}

export default Header;