import { useState } from 'react';
import '../styles/table.css'
import Dialog from '../Dialog';
import { getTotalPriceForCashPurchases } from '../../api/endpoints/shops';

const ShopsTable = ({ shops }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentShopId, setCurrentShopId] = useState(0);
    const [cashTotal, setCashTotal] = useState(null);

    const handleOpenDialog = (shopId) => {
        setCurrentShopId(shopId);
        fetchCashTotal(shopId);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setCurrentShopId(0);
        setCashTotal(null);
    };

    const fetchCashTotal = async (shopId) => {
        try {
            const response = await getTotalPriceForCashPurchases(parseInt(shopId));
            setCashTotal(response);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };


    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Адрес</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {shops.map(shop => (
                    <tr key={shop.id}>
                        <td>{shop.id}</td>
                        <td>{shop.name}</td>
                        <td>{shop.address}</td>
                        <td>
                            <button onClick={() => handleOpenDialog(shop.id)} className="add-button">
                                Сумма покупок наличными
                            </button>
                            {isDialogOpen && currentShopId === shop.id && (
                                <Dialog
                                    title="Сумма покупок наличными"
                                    onClose={handleCloseDialog}
                                    content={
                                        cashTotal !== null ? (
                                            <p>Сумма покупок наличными: {cashTotal}</p>
                                        ) : (
                                            <p>Загрузка...</p>
                                        )
                                    }
                                />)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ShopsTable;