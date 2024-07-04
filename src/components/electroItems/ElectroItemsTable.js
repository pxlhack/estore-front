import React from 'react';
import '../styles/table.css'

const ElectroItemsTable = ({ items, types }) => {

    function findElectroTypeById(id) {
        return types.find(type => type.id === id);
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>Цена</th>
                    <th>Описание</th>
                    <th>Архив</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{findElectroTypeById(item.electroTypeId).name}</td>
                        <td>{item.price}</td>
                        <td>{item.description}</td>
                        <td>{item.archive ? "Да" : "Нет"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ElectroItemsTable;