import Header from "../Header";
import { getElectroItemsPage } from "../../api/endpoints/electroItems";
import { getElectroTypesList } from "../../api/endpoints/electroTypes";
import { useEffect, useState } from "react";
import Dialog from "../Dialog";
import CreateElectroItem from "./CreateElectroItem";

const ElectroItemsPageWithTable = () => {
    const [electroItems, setElectroItems] = useState([]);
    const [electroTypes, setElectrotypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const size = 6;


    const handleOpenDialog = () => {
        fetchElectroTypes();
        setIsDialogOpen(true);

    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const fetchElectroItems = async () => {
        setIsLoading(true);
        try {
            const response = await getElectroItemsPage(currentPage, size);

            setElectroItems(response.items);
            setCurrentPage(response.currentPage);
            setTotalPages(response.totalPages);
            setTotalItems(response.totalItems);
            setIsLoading(false);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchElectroItems();
    }, [currentPage]);


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>Ошибка: {error.message}</p>;
    }

    const fetchElectroTypes = async () => {
        try {
            const electroTypesData = await getElectroTypesList();
            setElectrotypes(electroTypesData);
        } catch (error) {
            console.error('Error fetching electro types:', error);
        }
    };

    const handleElectroItemCreated = (createdElectroItem) => {
        setElectroItems([...electroItems, createdElectroItem]);
    };

    return (
        <>
            <Header />
            <div className="page">
                <h2>Товары</h2>

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

                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Тип</th>
                            <th>Цена</th>
                            <th>Описание</th>
                            <th>Архив</th>
                        </tr>
                    </thead>
                    <tbody>
                        {electroItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.electroType.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>{item.archive ? "Да" : "Нет"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                <br />

                <div>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                        Предыдущая
                    </button>
                    <span>
                        Страница {currentPage + 1} из {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                    >
                        Следующая
                    </button>
                </div>

                <p>
                    Показано {currentPage * size + 1} - {Math.min((currentPage + 1) * size, totalItems)} из {totalItems} товаров
                </p>


            </div >
        </>
    );
}
export default ElectroItemsPageWithTable;