import { useEffect, useState } from "react";
import { getPurchaseTypesList } from '../../api/endpoints/purchaseTypes'
import Header from "../Header";
import '../styles/page.css'
import '../styles/table.css'
import Dialog from "../Dialog";
import CreatePurchaseType from "./CreatePurchaseType";

const PurchaseTypesPage = () => {
    const [purchaseTypes, setPurchaseTypes] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };


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

    const handlePurchaseTypeCreated = (createdPurchaseType) => {
        setPurchaseTypes([...purchaseTypes, createdPurchaseType]);
    };

    return (
        <>
            <Header />

            <div className="page">

                <h2>Способы оплаты</h2>

                {purchaseTypes.length > 0 ? (
                    <div>

                        <button onClick={handleOpenDialog} className="add-button">
                            Добавить способ оплаты
                        </button>

                        {isDialogOpen && (
                            <Dialog
                                title="Добавить способ оплаты"
                                onClose={handleCloseDialog}
                                content={
                                    <CreatePurchaseType onPurchaseTypeCreated={handlePurchaseTypeCreated} />
                                }
                            />)}

                        <table className="table table-with-margin">
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