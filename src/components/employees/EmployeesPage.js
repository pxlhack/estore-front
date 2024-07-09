import React, { useEffect, useState } from 'react';
import { getEmployeesList } from '../../api/endpoints/employees';
import { getShopsList } from '../../api/endpoints/shops';
import EmployeesTable from './EmployeesTable';
import CreateEmployee from './CreateEmployee';
import Header from '../Header';
import Dialog from '../Dialog';
import { getPositionTypesList } from '../../api/endpoints/positionTypes';
import { Link } from 'react-router-dom';

const EmployeesPage = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [shops, setShops] = useState([]);
    const [positionTypes, setPositionTypes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeesData = await getEmployeesList();
                setEmployees(employeesData);
                setIsLoadingEmployees(false);
            } catch (error) {
                console.error('Error fetching employees:', error);
                setIsLoadingEmployees(false);
            }
        };

        fetchData();
    }, []);

    const fetchShopsAndPositionTypes = async () => {
        try {
            const [shopsData, positionTypesData] = await Promise.all([
                getShopsList(),
                getPositionTypesList()
            ]);
            setShops(shopsData);
            setPositionTypes(positionTypesData);
        } catch (error) {
            console.error('Error fetching shops and position types:', error);
        }
    };

    const handleOpenDialog = () => {
        fetchShopsAndPositionTypes();
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleEmployeeCreated = (createdEmployee) => {
        setEmployees([...employees, createdEmployee]);
    };

    return (
        <>
            <Header />

            <div className="page">
                <h2>Сотрудники</h2>

                <button onClick={handleOpenDialog} className="add-button">
                    Добавить сотрудника
                </button>
                <br />
                <br />

                <Link to="/employees/top-by-position/sales-sum">
                    <button className="btn">Лучшие сотрудники по сумме продаж</button>
                </Link>
                <br />
                <br />

                <Link to="/employees/top-by-position/sales-count">
                    <button className="btn">Лучшие сотрудники по количеству проданных товаров</button>
                </Link>
                <br />
                <br />

                <Link to="/employees/top">
                    <button className="btn">Лучшие сотрудники по должности и типу товаров</button>
                </Link>
                <br />

                {isDialogOpen && (
                    <Dialog
                        title="Добавить сотрудника"
                        onClose={handleCloseDialog}
                        content={
                            <CreateEmployee
                                onEmployeeCreated={handleEmployeeCreated}
                                shops={shops}
                                positionTypes={positionTypes}
                            />
                        }
                    />
                )}

                {isLoadingEmployees ? (
                    <p>Загрузка сотрудников...</p>
                ) : employees.length > 0 ? (
                    <EmployeesTable employees={employees} />
                ) : (
                    <p>Нет сотрудников</p>
                )}
            </div>
        </>
    );
};

export default EmployeesPage;