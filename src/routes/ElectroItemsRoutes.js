import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ElectroItemsPage from '../components/electroItems/ElectroItemsPage';

const ElectroItemsRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ElectroItemsPage />} />
        </Routes>
    );
};

export default ElectroItemsRoutes;