import { useEffect, useState } from "react";
import Header from "../Header";
import { getShopsList } from "../../api/endpoints/shops";
import Dialog from "../Dialog";
import ShopsTable from "./ShopsTable";
import CreateShop from "./CreateShop";

const ShopsPage = () => {
    const [shops, setShops] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        async function fetchShopsList() {
            try {
                const [shopsData] = await Promise.all([getShopsList()]);

                setShops(shopsData);

            } catch (error) {
                // Handle error
            }
        }

        fetchShopsList();
    }, []);


    const handleShopCreated = (createdShop) => {
        setShops([...shops, createdShop]);
    };

    return (
        <>
            <div className="page" style={{ margin: '20px' }}>
                <Header />

                {shops.length > 0 ? (
                    <>
                        <button onClick={handleOpenDialog} className="add-button">
                            Добавить магазин
                        </button>

                        {isDialogOpen && (<Dialog
                            title="Добавить новый магазин"
                            onClose={handleCloseDialog}
                            content={
                                <CreateShop onShopCreated={handleShopCreated} />
                            }
                        />)}

                        <ShopsTable shops={shops} />
                    </>
                ) : (<p>Загрузка магазинов...</p>)}
            </div>
        </>

    );
};

export default ShopsPage;