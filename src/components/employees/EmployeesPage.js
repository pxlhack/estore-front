import { useEffect, useState } from "react";
import { getEmployeesList } from "../../api/endpoints/employees";
import EmployeesTable from "./EmployeesTable";
import Header from "../Header";
import '../styles/page.css'

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

    return (
        <>
            <Header />

            <div className="page">

                {employees.length > 0 ? (
                    <>

                        <EmployeesTable employees={employees} />
                    </>
                ) : (<p>Загрузка сотрудников...</p>)}
            </div>
        </>
    );

}

export default EmployeesPage;