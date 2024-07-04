import { useEffect, useState } from "react";
import { getPurchasesList } from "../../api/endpoints/purchases.js"
import Header from "../Header.js";
import PurchasesTable from "./PurchasesTable.js";
import '../styles/page.css'

const PurchasesPages = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        async function fetchPurchasesList() {
            try {
                const [purchasesData] = await Promise.all([getPurchasesList()]);

                setPurchases(purchasesData);

            } catch (error) {
                // Handle error
            }
        }

        fetchPurchasesList();
    }, []);

    return (
        <>
            <Header />

            <div className="page">

                {purchases.length > 0 ? (

                    <PurchasesTable purchases={purchases} />
                ) : (<p>Загрузка покупок...</p>)}

            </div>
        </>

    );
}

export default PurchasesPages;