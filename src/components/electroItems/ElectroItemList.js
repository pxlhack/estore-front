import React, { useState, useEffect } from 'react';
import { getElectroItemsPage } from '../../api/endpoints/electroItems'

function ElectroItemList() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [error, setError] = useState(null);
    const size = 10;

    useEffect(() => {
        fetchItems(currentPage);
    }, [currentPage]);

    const fetchItems = async (page) => {
        try {
            const data = await getElectroItemsPage(page, size);
            setItems(data.items || []);
            setTotalPages(data.totalPages || 0);
            setTotalItems(data.totalItems || 0);
            setCurrentPage(data.currentPage || 0);
            setError(null);
        } catch (err) {
            console.error('Error fetching items:', err);
            setError('Failed to fetch items. Please try again later.');
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <ul>
                {items.length > 0 ? (
                    items.map(item => (
                        <li key={item.id}>{item.name}</li>
                    ))
                ) : (
                    <li>No items to display</li>
                )}
            </ul>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index)}
                        disabled={currentPage === index}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            {totalItems > 0 && (
                <p>Showing {currentPage * size + 1} - {Math.min((currentPage + 1) * size, totalItems)} of {totalItems} items</p>
            )}
        </div>
    );
}

export default ElectroItemList;