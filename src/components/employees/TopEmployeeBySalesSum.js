import React, { useEffect, useState } from 'react';
import { getTopEmployeesByPositionAndSalesSum } from '../../api/endpoints/employees';
import '../styles/table.css'
import Header from '../Header';

const TopEmployeeBySalesSum = () => {
    const [topEmployees, setTopEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topEmployeesData = await getTopEmployeesByPositionAndSalesSum();
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
                <h2>Лучшие сотрудники по сумме продаж за последний год</h2>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Должность</th>
                            <th>ID сотрудника</th>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Сумма продаж</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topEmployees.map(employee => (
                            <tr key={employee.employeeId}>
                                <td>{employee.position}</td>
                                <td>{employee.employeeId}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.salesSum}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TopEmployeeBySalesSum;
