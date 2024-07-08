import React, { useEffect, useState } from 'react';
import { getTopEmployeesByPositionAndSalesCount } from '../../api/endpoints/employees';
import '../styles/table.css'
import Header from '../Header';

const TopEmployeeBySalesCount = () => {
    const [topEmployees, setTopEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topEmployeesData = await getTopEmployeesByPositionAndSalesCount();
                setTopEmployees(topEmployeesData);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />

            <div className="page">
                <h2>Лучшие сотрудники по количеству проданных товаров за последний год</h2>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Должность</th>
                            <th>ID сотрудника</th>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Количество проданных товаров</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topEmployees.map(employee => (
                            <tr key={employee.employeeId}>
                                <td>{employee.position}</td>
                                <td>{employee.employeeId}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.salesCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TopEmployeeBySalesCount;
