import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "../components/Home"
import ElectroItemsRoutes from './ElectroItemsRoutes';
import ShopsRoutes from './ShopsRoutes';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/electro-items/*" element={<ElectroItemsRoutes />} />
            <Route path="/shops/*" element={<ShopsRoutes />} />
        </Routes>
    );
};

export default AppRoutes;