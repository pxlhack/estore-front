import { useState } from 'react';
import '../styles/table.css';

const PurchasesTable = ({ purchases }) => {
    const [sortBy, setSortBy] = useState('desc'); // Начальное значение - сортировка по убыванию по умолчанию

    // Функция для переключения направления сортировки и сортировки данных
    const handleSortByDate = () => {
        if (sortBy === 'asc') {
            setSortBy('desc');
            // Сортировка по убыванию даты
            purchases.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
        } else {
            setSortBy('asc');
            // Сортировка по возрастанию даты
            purchases.sort((a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate));
        }
    };

    // Функция для форматирования даты
    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat('ru-RU').format(new Date(dateString));
    };

    // Используем отсортированные данные в зависимости от текущей сортировки
    const sortedPurchases = sortBy === 'asc'
        ? [...purchases].sort((a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate))
        : [...purchases].sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Товар</th>
                    <th>Магазин</th>
                    <th onClick={handleSortByDate} style={{ cursor: 'pointer' }}>
                        Дата покупки
                        {sortBy === 'asc' && <span>&uarr;</span>}
                        {sortBy === 'desc' && <span>&darr;</span>}
                    </th>
                    <th>Способ оплаты</th>
                </tr>
            </thead>
            <tbody>
                {sortedPurchases.map(purchase => (
                    <tr key={purchase.id}>
                        <td>{purchase.id}</td>
                        <td>{purchase.electroItem.name}</td>
                        <td>{purchase.shop.name}</td>
                        <td>{formatDate(purchase.purchaseDate)}</td>
                        <td>{purchase.purchaseType.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PurchasesTable;
