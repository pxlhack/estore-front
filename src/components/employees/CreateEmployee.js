import React, { useState } from 'react';
import { createEmployee } from '../../api/endpoints/employees';

const CreateEmployee = ({ onEmployeeCreated, shops, positionTypes }) => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [positionTypeId, setPositionTypeId] = useState(positionTypes.length > 0 ? positionTypes[0]?.id : '');
    const [shopId, setShopId] = useState(shops.length > 0 ? shops[0]?.id : '');
    const [gender, setGender] = useState(true);

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handlePatronymicChange = (event) => {
        setPatronymic(event.target.value);
    };

    const handleBirthDateChange = (event) => {
        setBirthDate(event.target.value);
    };

    const handlePositionTypeIdChange = (event) => {
        setPositionTypeId(event.target.value);
    };

    const handleShopIdChange = (event) => {
        setShopId(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value === 'male');
    };

    const handleCreateEmployee = async (e) => {
        e.preventDefault();

        try {
            const newEmployee = {
                lastName: lastName,
                firstName: firstName,
                patronymic: patronymic,
                birthDate: birthDate,
                positionTypeId: parseInt(positionTypeId),
                shopId: parseInt(shopId),
                gender: gender
            };

            const data = await createEmployee(newEmployee);

            setLastName('');
            setFirstName('');
            setPatronymic('');
            setBirthDate('');
            setPositionTypeId(positionTypes.length > 0 ? positionTypes[0]?.id : '');
            setShopId(shops.length > 0 ? shops[0]?.id : '');
            setGender(true);

            onEmployeeCreated(data);
            alert('Сотрудник успешно создан!');
        } catch (error) {
            console.error('Error creating employee:', error);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleCreateEmployee}>
            <div>
                <label htmlFor="lastName">Фамилия:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={handleLastNameChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="firstName">Имя:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="patronymic">Отчество:</label>
                <input
                    type="text"
                    id="patronymic"
                    value={patronymic}
                    onChange={handlePatronymicChange}
                />
            </div>

            <div>
                <label htmlFor="birthDate">Дата рождения:</label>
                <input
                    type="date"
                    id="birthDate"
                    value={birthDate}
                    onChange={handleBirthDateChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="positionTypeId">Должность:</label>
                <select
                    id="positionTypeId"
                    value={positionTypeId}
                    onChange={handlePositionTypeIdChange}
                    required
                >
                    {positionTypes.map((positionType) => (
                        <option key={positionType.id} value={positionType.id}>
                            {positionType.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="shopId">Магазин:</label>
                <select
                    id="shopId"
                    value={shopId}
                    onChange={handleShopIdChange}
                    required
                >
                    {shops.map((shop) => (
                        <option key={shop.id} value={shop.id}>
                            {shop.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Пол:</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="male"
                            checked={gender === true}
                            onChange={handleGenderChange}
                        />{' '}
                        Мужской
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="female"
                            checked={gender === false}
                            onChange={handleGenderChange}
                        />{' '}
                        Женский
                    </label>
                </div>
            </div>

            <button type="submit">Создать сотрудника</button>
        </form>
    );
};

export default CreateEmployee;
