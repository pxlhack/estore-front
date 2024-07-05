import { useState } from 'react';
import { createPurchase } from '../../api/endpoints/purchases';

const CreatePurchase = ({ onPurchaseCreated, shops, electroItems, purchaseTypes, employees }) => {
    const [shopId, setShopId] = useState(shops[0]?.id || '');
    const [electroItemId, setElectroItemId] = useState(electroItems[0]?.id || '');
    const [employeeId, setEmployeeId] = useState(employees[0]?.id || '');
    const [purchaseTypeId, setPurchaseTypeId] = useState(purchaseTypes[0]?.id || '');
    const [purchaseDate, setPurchaseDate] = useState('');


    const handleElectroItemIdChange = (event) => {
        setElectroItemId(event.target.value);
    };

    const handleEmployeeIdChange = (event) => {
        setEmployeeId(event.target.value);
    };

    const handleShopIdChange = (event) => {
        setShopId(event.target.value);
    };

    const handlePurchaseDateChange = (event) => {
        setPurchaseDate(event.target.value);
    };

    const handlePurchaseTypeIdChange = (event) => {
        setPurchaseTypeId(event.target.value);
    };



    const handleCreatePurchase = async (e) => {
        e.preventDefault();

        console.log(purchaseDate);
        try {
            const newPurchase = {
                shopId: parseInt(shopId),
                electroItemId: parseInt(electroItemId),
                purchaseTypeId: parseInt(purchaseTypeId),
                employeeId: parseInt(employeeId),
                purchaseDate: purchaseDate
            }

            let data = await createPurchase(newPurchase);

            setShopId(shops[0]?.id || '');
            setElectroItemId(electroItems[0]?.id || '');
            setEmployeeId(employees[0]?.id || '');
            setPurchaseTypeId(purchaseTypes[0]?.id || '');
            setPurchaseDate('');

            onPurchaseCreated(data);
            alert("Покупка успешно создана!");

        }
        catch (error) {
            //check error
        }
    }

    return (
        <form onSubmit={handleCreatePurchase}>

            <div>
                <label htmlFor="shopId">Магазин:</label>
                <select id="shopId" value={shopId} onChange={handleShopIdChange}>
                    {shops.map(shop => (
                        <option key={shop.id} value={shop.id}>
                            {shop.name}
                        </option>
                    ))}
                </select>
            </div>

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


            <button type="submit">Создать покупку</button>
        </form>
    );
};

export default CreatePurchase;