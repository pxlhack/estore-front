import React from "react";
import "./styles/page.css"
import Header from "./Header";
import FileUpload from "./FileUpload";

const Home = () => {
    return (
        <>
            <Header />
            <div className="page">
                <FileUpload />
            </div>
        </>

    );
};

export default Home;