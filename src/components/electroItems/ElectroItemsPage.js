import { useEffect, useState } from "react";
import Header from "../Header";
import { getElectroItemsPage } from "../../api/endpoints/electroItems";
import { getElectroTypesList } from "../../api/endpoints/electroTypes";
import ElectroItemsTable from "./ElectroItemsTable";
import Dialog from "../Dialog";
import CreateElectroItem from "./CreateElectroItem";
import '../styles/page.css'

const ElectroItemsPage = () => {
    const [electroItems, setElectroItems] = useState([]);
    const [electroTypes, setElectroTypes] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const size = 10; // количество элементов на странице

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const [electroItemData, electroTypeData] = await Promise.all([
                    getElectroItemsPage(currentPage, size),
                    getElectroTypesList()
                ]);

                setElectroItems(electroItemData.items);
                setTotalPages(electroItemData.totalPages);
                setTotalItems(electroItemData.totalItems);
                setElectroTypes(electroTypeData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleElectroItemCreated = (createdElectroItem) => {
        setElectroItems([...electroItems, createdElectroItem]);
    };

    return (
        <>
            <Header />

            <div className="page">
                {isLoading ? (
                    <p>Загрузка товаров...</p>
                ) : (
                    <>
                        <button onClick={handleOpenDialog} className="add-button">
                            Добавить товар
                        </button>

                        {isDialogOpen && (
                            <Dialog
                                title="Добавить новый товар"
                                onClose={handleCloseDialog}
                                content={
                                    <CreateElectroItem
                                        onElectroItemCreated={handleElectroItemCreated}
                                        electroTypes={electroTypes}
                                    />
                                }
                            />
                        )}

                        <ElectroItemsTable
                            items={electroItems}
                            types={electroTypes}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            onPageChange={handlePageChange}
                            itemsPerPage={size}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default ElectroItemsPage;