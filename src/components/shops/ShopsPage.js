import { useEffect, useState } from "react";
import Header from "../Header";
import { getShopsList } from "../../api/endpoints/shops";
import { getElectroItemsList } from "../../api/endpoints/electroItems"
import { getPurchaseTypesList } from "../../api/endpoints/purchaseTypes"
import Dialog from "../Dialog";
import ShopsTable from "./ShopsTable";
import CreateShop from "./CreateShop";
import CreatePurchaseInShop from "./CreatePurchaseInShop";
import '../styles/page.css'

const ShopsPage = () => {
    const [shops, setShops] = useState([]);
    const [isCreateShopDialogOpen, setIsCreateShopDialogOpen] = useState(false);
    const [isCreatePurchaseDialogOpen, setIsCreatePurchaseDialogOpen] = useState(false);
    const [selectedShopId, setSelectedShopId] = useState(null);
    const [electroItems, setElectroItems] = useState([]);
    const [purchaseTypes, setPurchaseTypes] = useState([]);

    const handleOpenCreateShopDialog = () => {
        setIsCreateShopDialogOpen(true);
    };

    const handleCloseCreateShopDialog = () => {
        setIsCreateShopDialogOpen(false);
    };

    const handleOpenCreatePurchaseDialog = (shopId) => {
        setSelectedShopId(shopId);
        setIsCreatePurchaseDialogOpen(true);
    };

    const handleCloseCreatePurchaseDialog = () => {
        setIsCreatePurchaseDialogOpen(false);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const [shopsData, electroItemsData, purchaseTypesData] = await Promise.all([
                    getShopsList(),
                    getElectroItemsList(),
                    getPurchaseTypesList()
                ]);

                setShops(shopsData);
                setElectroItems(electroItemsData);
                setPurchaseTypes(purchaseTypesData);

            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        }

        fetchData();
    }, []);

    const handleShopCreated = (createdShop) => {
        setShops([...shops, createdShop]);
    };

    const handlePurchaseCreated = (createdPurchase) => {
        console.log('Создана новая покупка:', createdPurchase);
    };

    return (
        <>
            <Header />

            <div className="page">
                {shops.length > 0 ? (
                    <>
                        <button onClick={handleOpenCreateShopDialog} className="add-button">
                            Добавить магазин
                        </button>

                        {isCreateShopDialogOpen && (
                            <Dialog
                                title="Добавить новый магазин"
                                onClose={handleCloseCreateShopDialog}
                                content={
                                    <CreateShop onShopCreated={handleShopCreated} />
                                }
                            />
                        )}

                        <ShopsTable
                            shops={shops}
                            onCreatePurchase={handleOpenCreatePurchaseDialog}
                        />

                        {isCreatePurchaseDialogOpen && (
                            <Dialog
                                title="Создать покупку в магазине"
                                onClose={handleCloseCreatePurchaseDialog}
                                content={
                                    <CreatePurchaseInShop
                                        onPurchaseCreated={handlePurchaseCreated}
                                        shopId={selectedShopId}
                                        electroItems={electroItems}
                                        purchaseTypes={purchaseTypes}
                                    />
                                }
                            />
                        )}
                    </>
                ) : (
                    <p>Загрузка магазинов...</p>
                )}
            </div>
        </>
    );
};

export default ShopsPage;