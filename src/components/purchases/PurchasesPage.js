import { useEffect, useState } from "react";
import { getPurchasesList } from "../../api/endpoints/purchases.js"
import Header from "../Header.js";
import PurchasesTable from "./PurchasesTable.js";
import '../styles/page.css'
import Dialog from "../Dialog.js";
import CreatePurchase from "./CreatePurchase.js";
import { getElectroItemsList } from "../../api/endpoints/electroItems.js";
import { getShopsList } from "../../api/endpoints/shops.js";
import { getPurchaseTypesList } from "../../api/endpoints/purchaseTypes.js";
import { getEmployeesList } from "../../api/endpoints/employees.js";

const PurchasesPages = () => {
    const [purchases, setPurchases] = useState([]);
    const [electroItems, setElectroItems] = useState([]);
    const [shops, setShops] = useState([]);
    const [purchaseTypes, setPurchaseTypes] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        async function fetchPurchasesList() {
            try {
                const [
                    purchasesData,
                    electroItemsData,
                    shopsData,
                    purchaseTypesData,
                    employeesData
                ] = await Promise.all([
                    getPurchasesList(),
                    getElectroItemsList(),
                    getShopsList(),
                    getPurchaseTypesList(),
                    getEmployeesList()
                ]);

                setPurchases(purchasesData);
                setElectroItems(electroItemsData);
                setShops(shopsData);
                setPurchaseTypes(purchaseTypesData);
                setEmployees(employeesData);

                console.log(employeesData);

            } catch (error) {
                // Handle error
            }
        }

        fetchPurchasesList();
    }, []);

    const handlePurchaseCreated = (createdPurchase) => {
        setPurchases([...purchases, createdPurchase]);
    };

    return (
        <>
            <Header />

            <div className="page">

                {purchases.length > 0 ? (
                    <div>

                        <button onClick={handleOpenDialog} className="add-button">
                            Добавить покупку
                        </button>

                        {isDialogOpen && (
                            <Dialog
                                title="Добавить новую покупку"
                                onClose={handleCloseDialog}
                                content={
                                    <CreatePurchase
                                        onPurchaseCreated={handlePurchaseCreated}
                                        shops={shops}
                                        electroItems={electroItems}
                                        purchaseTypes={purchaseTypes}
                                        employees={employees}
                                    />
                                }
                            />)}

                        <PurchasesTable purchases={purchases} />
                    </div>

                ) : (<p>Загрузка покупок...</p>)}

            </div>
        </>

    );
}

export default PurchasesPages;