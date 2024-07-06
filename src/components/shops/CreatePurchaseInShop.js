import { useState, useEffect } from 'react';
import { createPurchase } from '../../api/endpoints/purchases';
import { getEmployeesByShopId } from '../../api/endpoints/shops';

const CreatePurchaseInShop = ({ onPurchaseCreated, shopId, electroItems, purchaseTypes }) => {
    const [electroItemId, setElectroItemId] = useState(electroItems[0]?.id || '');
    const [employeeId, setEmployeeId] = useState('');
    const [purchaseTypeId, setPurchaseTypeId] = useState(purchaseTypes[0]?.id || '');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [count, setCount] = useState(1);
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setIsLoading(true);
                const employeesData = await getEmployeesByShopId(shopId);
                setEmployees(employeesData);
                if (employeesData.length > 0) {
                    setEmployeeId(employeesData[0].id);
                }
            } catch (error) {
                console.error('Ошибка при получении списка сотрудников:', error);
                setError('Ошибка при получении списка сотрудников');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployees();
    }, [shopId]);

    const handleElectroItemIdChange = (event) => {
        setElectroItemId(event.target.value);
    };

    const handleEmployeeIdChange = (event) => {
        setEmployeeId(event.target.value);
    };

    const handlePurchaseDateChange = (event) => {
        setPurchaseDate(event.target.value);
    };

    const handlePurchaseTypeIdChange = (event) => {
        setPurchaseTypeId(event.target.value);
    };

    const handleCountChange = (event) => {
        setCount(parseInt(event.target.value) || 1);
    };

    const handleCreatePurchase = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!purchaseDate) {
            alert("Пожалуйста, выберите дату покупки.");
            return;
        }

        try {
            setIsLoading(true);
            const newPurchase = {
                shopId: parseInt(shopId),
                electroItemId: parseInt(electroItemId),
                purchaseTypeId: parseInt(purchaseTypeId),
                employeeId: parseInt(employeeId),
                purchaseDate: purchaseDate,
                count: count
            };

            console.log(newPurchase);
            let data = await createPurchase(newPurchase);

            // Reset form fields
            setElectroItemId(electroItems[0]?.id || '');
            setEmployeeId(employees[0]?.id || '');
            setPurchaseTypeId(purchaseTypes[0]?.id || '');
            setPurchaseDate('');
            setCount(1);

            onPurchaseCreated(data);
            alert("Покупка успешно создана!");
        } catch (error) {
            console.error(error);
            if (error.response) {
                alert(error.response.data);
            } else {
                alert("Произошла ошибка при создании покупки.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <form onSubmit={handleCreatePurchase}>
            <div>
                <label htmlFor="electroItemId">Товар:</label>
                <select id="electroItemId" value={electroItemId} onChange={handleElectroItemIdChange}>
                    {electroItems.map(electroItem => (
                        <option key={electroItem.id} value={electroItem.id}>
                            {electroItem.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="employeeId">Сотрудник:</label>
                <select id="employeeId" value={employeeId} onChange={handleEmployeeIdChange}>
                    {employees.map(employee => (
                        <option key={employee.id} value={employee.id}>
                            {employee.lastName + " " + employee.firstName + " " + employee.patronymic}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="purchaseTypeId">Способ оплаты:</label>
                <select id="purchaseTypeId" value={purchaseTypeId} onChange={handlePurchaseTypeIdChange}>
                    {purchaseTypes.map(purchaseType => (
                        <option key={purchaseType.id} value={purchaseType.id}>
                            {purchaseType.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="purchaseDate">Дата покупки:</label>
                <input
                    type="date"
                    id="purchaseDate"
                    onChange={handlePurchaseDateChange}
                    value={purchaseDate}
                />
            </div>

            <div>
                <label htmlFor="count">Количество:</label>
                <input
                    type="number"
                    id="count"
                    min="1"
                    value={count}
                    onChange={handleCountChange}
                />
            </div>

            <button type="submit" disabled={isLoading}>Создать покупку</button>
        </form>
    );
};

export default CreatePurchaseInShop;