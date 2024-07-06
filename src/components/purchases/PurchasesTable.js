import { useState, useMemo } from 'react';
import '../styles/table.css'; // Make sure to add styles for the sort icons and active column

const PurchasesTable = ({ purchases }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'purchaseDate', direction: 'desc' });

    const handleSort = (key) => {
        setSortConfig((prevConfig) => {
            if (prevConfig.key === key) {
                return {
                    key,
                    direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'
                };
            } else {
                return {
                    key,
                    direction: 'asc'
                };
            }
        });
    };

    const sortedPurchases = useMemo(() => {
        const sorted = [...purchases].sort((a, b) => {
            if (sortConfig.key === 'purchaseDate') {
                return new Date(a.purchaseDate) - new Date(b.purchaseDate);
            }
            return a.id - b.id;
        });
        return sortConfig.direction === 'asc' ? sorted : sorted.reverse();
    }, [purchases, sortConfig]);

    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat('ru-RU').format(new Date(dateString));
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th
                        onClick={() => handleSort('id')}
                        style={{ cursor: 'pointer' }}
                        aria-sort={sortConfig.key === 'id' ? sortConfig.direction : 'none'}
                    >
                        ID
                        {sortConfig.key === 'id' ? (
                            sortConfig.direction === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>
                        ) : (
                            <span>&#x21C5;</span>
                        )}
                    </th>
                    <th>Товар</th>
                    <th>Магазин</th>
                    <th
                        onClick={() => handleSort('purchaseDate')}
                        style={{ cursor: 'pointer' }}
                        aria-sort={sortConfig.key === 'purchaseDate' ? sortConfig.direction : 'none'}
                    >
                        Дата покупки
                        {sortConfig.key === 'purchaseDate' ? (
                            sortConfig.direction === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>
                        ) : (
                            <span>&#x21C5;</span>
                        )}
                    </th>
                    <th>Способ оплаты</th>
                </tr>
            </thead>
            <tbody>
                {sortedPurchases.map((purchase) => (
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
