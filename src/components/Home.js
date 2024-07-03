import { Link } from "react-router-dom";
import React from "react";

const Home = () => {
    return (
        <div className="inner-container">
            <Link to="/electro-items" className="link">Товары</Link>
        </div>
    );
};

export default Home;