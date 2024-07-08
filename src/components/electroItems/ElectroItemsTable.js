import React from 'react';
import '../styles/table.css'

const ElectroItemsTable = ({ items, types, currentPage, totalPages, totalItems, onPageChange, itemsPerPage }) => {

    function findElectroTypeById(id) {
        return types.find(type => type.id === id);
    }

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 0; i < totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    disabled={currentPage === i}
                >
                    {i + 1}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <>
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
                            <td>{findElectroTypeById(item.electroTypeId)?.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td>{item.archive ? "Да" : "Нет"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {renderPagination()}
            </div>
            <p>
                Показано {currentPage * itemsPerPage + 1} - {Math.min((currentPage + 1) * itemsPerPage, totalItems)} из {totalItems} товаров
            </p>
        </>
    );
};

export default ElectroItemsTable;