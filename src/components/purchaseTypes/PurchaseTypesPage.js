import { useEffect, useState } from "react";
import { getPurchaseTypesList } from '../../api/endpoints/purchaseTypes'
import Header from "../Header";
import '../styles/page.css'
import '../styles/table.css'

const PurchaseTypesPage = () => {
    const [purchaseTypes, setPurchaseTypes] = useState([]);


    useEffect(() => {
        async function fetchPurchaseTypesList() {
            try {
                const [PurchaseTypesData] = await Promise.all([getPurchaseTypesList()]);

                setPurchaseTypes(PurchaseTypesData);

            } catch (error) {
                // Handle error
            }
        }

        fetchPurchaseTypesList();
    }, []);

    return (
        <>
            <Header />
            <div className="page">
                <h2>Способы оплаты</h2>
                {purchaseTypes.length > 0 ? (
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Название</th>
                                </tr>
                            </thead>

                            <tbody>
                                {purchaseTypes.map(purchaseType => (
                                    <tr key={purchaseType.id}>
                                        <td>{purchaseType.id}</td>
                                        <td>{purchaseType.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>

                ) : (
                    <p>Загрузка способов оплаты...</p>
                )}
            </div>
        </>
    );
};

export default PurchaseTypesPage;