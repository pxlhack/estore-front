import React, { useEffect, useState } from "react";
import { getEmployeesList } from "../../api/endpoints/employees";
import EmployeesTable from "./EmployeesTable";
import CreateEmployee from "./CreateEmployee";
import Header from "../Header";
import Dialog from "../Dialog";

const EmployeesPage = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        async function fetchEmployeesList() {
            try {
                const [employeesData] = await Promise.all([getEmployeesList()]);
                setEmployees(employeesData);
            } catch (error) {
                console.error('Error fetching employees:', error);
                // Handle error
            } finally {
                setIsLoading(false);
            }
        }

        fetchEmployeesList();
    }, []);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleEmployeeCreated = (createdEmployee) => {
        setEmployees([...employees, createdEmployee]);
        setIsDialogOpen(false); // Close the dialog after creating employee
        // Optionally show a notification or alert
    };

    return (
        <>
            <Header />

            <div className="page">
                <h2>Сотрудники</h2>

                <button onClick={handleOpenDialog} className="add-button">
                    Добавить сотрудника
                </button>

                {isDialogOpen && (
                    <Dialog
                        title="Добавить сотрудника"
                        onClose={handleCloseDialog}
                        content={
                            <CreateEmployee onEmployeeCreated={handleEmployeeCreated} />
                        }
                    />
                )}

                {isLoading ? (
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