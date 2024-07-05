import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "../components/Home"
import ElectroItemsRoutes from './ElectroItemsRoutes';
import ShopsRoutes from './ShopsRoutes';
import EmployeesRoutes from './EmployeesRoutes';
import PurchasesRoutes from './PurchasesRoutes';
import PurchaseTypesRoutes from './PurchaseTypesRoutes';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/electro-items/*" element={<ElectroItemsRoutes />} />
            <Route path="/shops/*" element={<ShopsRoutes />} />
            <Route path="/employees/*" element={<EmployeesRoutes />} />
            <Route path="/purchases/*" element={<PurchasesRoutes />} />
            <Route path="/purchase-types/*" element={<PurchaseTypesRoutes />} />
        </Routes>
    );
};

export default AppRoutes;