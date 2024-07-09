import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ElectroItemsPage from '../components/electroItems/ElectroItemsPage';
import ElectroItemList from '../components/electroItems/ElectroItemList';

const ElectroItemsRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ElectroItemsPage />} />
            <Route path="/all" element={<ElectroItemList />} />
        </Routes>
    );
};

export default ElectroItemsRoutes;