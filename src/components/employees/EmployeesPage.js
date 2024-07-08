import { useEffect, useState } from "react";
import { getEmployeesList } from "../../api/endpoints/employees";
import EmployeesTable from "./EmployeesTable";
import CreateEmployee from "./CreateEmployee";
import Header from "../Header";
import '../styles/page.css'
import Dialog from "../Dialog";

const EmployeesPage = () => {
    const [employees, setEmployees] = useState([]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        async function fetchEmployeesList() {
            try {
                const [employeesData] = await Promise.all([getEmployeesList()]);

                setEmployees(employeesData);

            } catch (error) {
                // Handle error
            }
        }

        fetchEmployeesList();
    }, []);

    const handleEmployeeCreated = (createdEmployee) => {
        setEmployees([...employees, createdEmployee]);
    };

    return (
        <>
            <Header />

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
                />)}


            <div className="page">
                {employees.length > 0 ? (
                    <EmployeesTable employees={employees} />
                ) : (<p>Загрузка сотрудников...</p>)}
            </div>
        </>
    );

}

export default EmployeesPage;