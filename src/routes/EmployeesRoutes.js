import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeesPage from '../components/employees/EmployeesPage';
import TopEmployeeBySalesSum from '../components/employees/TopEmployeeBySalesSum';
import TopEmployeeBySalesCount from '../components/employees/TopEmployeeBySalesCount';

const EmployeesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<EmployeesPage />} />
            <Route path="/top-by-position/sales-sum" element={<TopEmployeeBySalesSum />} />
            <Route path="/top-by-position/sales-count" element={<TopEmployeeBySalesCount />} />
        </Routes>
    );
};

export default EmployeesRoutes;