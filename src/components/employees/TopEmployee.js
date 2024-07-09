import React, { useEffect, useState } from 'react';
import { getTopEmployee } from '../../api/endpoints/employees';
import { getPositionTypesList } from '../../api/endpoints/positionTypes';
import { getElectroTypesList } from '../../api/endpoints/electroTypes';
import Header from '../Header';
import '../styles/page.css'
import '../styles/table.css'

const TopEmployee = () => {
    const [topEmployee, setTopEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [positionTypes, setPositionTypes] = useState([]);
    const [electroTypes, setElectroTypes] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState('');
    const [selectedElectroType, setSelectedElectroType] = useState('');

    useEffect(() => {
        const fetchTypes = async () => {
            setIsLoading(true);
            try {
                const [positions, electroTypes] = await Promise.all([
                    getPositionTypesList(),
                    getElectroTypesList()
                ]);
                setPositionTypes(positions);
                setElectroTypes(electroTypes);
                if (positions.length > 0) setSelectedPosition(positions[0].name);
                if (electroTypes.length > 0) setSelectedElectroType(electroTypes[0].name);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchTypes();
    }, []);

    const fetchTopEmployee = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getTopEmployee(selectedPosition, selectedElectroType);
            setTopEmployee(data);
            setIsLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError(new Error('Сотрудник не продавал такие товары'));
            } else {
                setError(error);
            }
            setIsLoading(false);
        }
    };

    const handlePositionChange = (event) => {
        setSelectedPosition(event.target.value);
    };

    const handleElectroTypeChange = (event) => {
        setSelectedElectroType(event.target.value);
    };

    return (
        <>
            <Header />
            <div className='page'>
                <h2>Лучший сотрудник по продажам</h2>
                <div>
                    <label>
                        Тип должности:
                        <select value={selectedPosition} onChange={handlePositionChange}>
                            {positionTypes.map((position) => (
                                <option key={position.id} value={position.name}>
                                    {position.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Тип электроники:
                        <select value={selectedElectroType} onChange={handleElectroTypeChange}>
                            {electroTypes.map((type) => (
                                <option key={type.id} value={type.name}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <button onClick={fetchTopEmployee}>Получить лучшего сотрудника</button>
                {isLoading ? (
                    <p>Загрузка...</p>
                ) : error ? (
                    <p>Ошибка: {error.message}</p>
                ) : (
                    topEmployee && (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Имя</th>
                                    <th>Фамилия</th>
                                    <th>Количество продаж</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{topEmployee.firstname}</td>
                                    <td>{topEmployee.lastname}</td>
                                    <td>{topEmployee.salesCount}</td>
                                </tr>
                            </tbody>
                        </table>
                    )
                )}
            </div>
        </>
    );
};

export default TopEmployee;
