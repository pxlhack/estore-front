import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeesPage from '../components/employees/EmployeesPage';

const EmployeesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<EmployeesPage />} />
        </Routes>
    );
};

export default EmployeesRoutes;