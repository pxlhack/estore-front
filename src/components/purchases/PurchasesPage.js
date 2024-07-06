import { useEffect, useState } from "react";
import { getPurchasesList } from "../../api/endpoints/purchases";
import Header from "../Header";
import PurchasesTable from "./PurchasesTable";
import '../styles/page.css';

const PurchasesPages = () => {
    const [purchases, setPurchases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPurchasesList() {
            try {
                const purchasesData = await getPurchasesList();
                setPurchases(purchasesData);
            } catch (error) {
                setError('Ошибка при загрузке покупок');
                console.error('Error fetching purchases:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPurchasesList();
    }, []);

    return (
        <>
            <Header />

            <div className="page">
                {isLoading ? (
                    <p>Загрузка покупок...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : purchases.length > 0 ? (
                    <PurchasesTable purchases={purchases} />
                ) : (
                    <p>Нет покупок для отображения.</p>
                )}
            </div>
        </>
    );
}

export default PurchasesPages;
