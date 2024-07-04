import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ShopsPage from '../components/shops/ShopsPage';

const ShopsRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ShopsPage />} />
        </Routes>
    );
};

export default ShopsRoutes;
