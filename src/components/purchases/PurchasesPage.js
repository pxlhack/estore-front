import React, { useEffect, useState } from 'react';
import { getPurchasesPageSorted } from '../../api/endpoints/purchases';
import Header from '../Header';
import '../styles/page.css';
import '../styles/table.css';

const PurchasesPage = () => {
    const [purchases, setPurchases] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [sortOrder, setSortOrder] = useState('asc');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const size = 10;

    const fetchPurchases = async () => {
        setIsLoading(true);
        try {
            const response = await getPurchasesPageSorted(currentPage, size, sortOrder === 'asc');

            setPurchases(response.items);
            setCurrentPage(response.currentPage);
            setTotalPages(response.totalPages);
            setTotalItems(response.totalItems);
            setIsLoading(false);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPurchases();
    }, [currentPage, sortOrder]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSortChange = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>Ошибка: {error.message}</p>;
    }

    const formatDate = (dateString) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleString('ru-RU', options);
    };

    return (
        <>
            <Header />
            <div className="page">
                <h2>Покупки</h2>
                <button onClick={handleSortChange}>
                    Сортировка по дате: {sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'}
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Наименование товара</th>
                            <th>Магазин</th>
                            <th>Дата покупки</th>
                            <th>Способ оплаты</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((purchase) => (
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
                <br />
                <br />

                <div>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                        Предыдущая
                    </button>
                    <span>
                        Страница {currentPage + 1} из {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                    >
                        Следующая
                    </button>
                </div>

                <p>
                    Показано {currentPage * size + 1} - {Math.min((currentPage + 1) * size, totalItems)} из {totalItems} покупок
                </p>
            </div>
        </>
    );
};

export default PurchasesPage;