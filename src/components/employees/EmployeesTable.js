
const EmployeesTable = ({ employees }) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ФИО</th>
                    <th>Дата рождения</th>
                    <th>Пол</th>
                    <th>Магазин</th>
                    <th>Должность</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.lastName + " " + employee.firstName + " " + employee.patronymic}</td>
                        <td>{new Intl.DateTimeFormat('ru-RU').format(new Date(employee.birthDate))}</td>
                        <td>{employee.gender ? "Мужской" : "Женский"}</td>
                        <td>{employee.shop.name}</td>
                        <td>{employee.positionType.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

}

export default EmployeesTable;