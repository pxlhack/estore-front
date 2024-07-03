import { useEffect, useState } from "react";
import Header from "../Header";
import { getElectroItemsList } from "../../api/endpoints/electroItems";
import { getElectroTypesList } from "../../api/endpoints/electroTypes";
import ElectroItemsTable from "./ElectroItemsTable";
import Dialog from "../Dialog";
import CreateElectroItem from "./CreateElectroItem";

function ElectroItemsPage() {
    const [electroItems, setElectroItems] = useState([]);
    const [electroTypes, setElectroTypes] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        async function fetchElectroItemsList() {
            try {
                const [electroItemData, electroTypeData] = await Promise.all([getElectroItemsList(), getElectroTypesList()]);

                setElectroItems(electroItemData);
                setElectroTypes(electroTypeData);

            } catch (error) {
                // Handle error
            }
        }

        fetchElectroItemsList();
    }, []);


    const handleElectroItemCreated = (createdElectroItem) => {
        setElectroItems([...electroItems, createdElectroItem]);
    };

    return (
        <>
            <Header />

            {electroItems.length > 0 ? (
                <>
                    <button onClick={handleOpenDialog} className="add-button">
                        Добавить товар
                    </button>

                    {isDialogOpen && (<Dialog
                        title="Добавить новый товар"
                        onClose={handleCloseDialog}
                        content={
                            <CreateElectroItem
                                onElectroItemCreated={handleElectroItemCreated}
                                electroTypes={electroTypes}
                            />
                        }
                    />)}

                    <ElectroItemsTable
                        items={electroItems}
                        types={electroTypes}
                    />
                </>
            ) : (<p>Загрузка товаров...</p>)}
        </>

    );
};

export default ElectroItemsPage;