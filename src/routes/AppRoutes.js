import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "../components/Home"
import ElectroItemsRoutes from './ElectroItemsRoutes';
import ShopsRoutes from './ShopsRoutes';
import EmployeesRoutes from './EmployeesRoutes';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/electro-items/*" element={<ElectroItemsRoutes />} />
            <Route path="/shops/*" element={<ShopsRoutes />} />
            <Route path="/employees/*" element={<EmployeesRoutes />} />
        </Routes>
    );
};

export default AppRoutes;